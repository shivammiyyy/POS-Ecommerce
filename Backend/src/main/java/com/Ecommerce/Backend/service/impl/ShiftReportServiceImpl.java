package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.domain.PaymentType;
import com.Ecommerce.Backend.mapper.ShiftReportMapper;
import com.Ecommerce.Backend.model.*;
import com.Ecommerce.Backend.payload.dto.ShiftReportDTO;
import com.Ecommerce.Backend.repository.OrderRepository;
import com.Ecommerce.Backend.repository.RefundRepository;
import com.Ecommerce.Backend.repository.ShiftReportRepository;
import com.Ecommerce.Backend.repository.UserRepository;
import com.Ecommerce.Backend.service.ShiftReportService;
import com.Ecommerce.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShiftReportServiceImpl implements ShiftReportService {

    private final ShiftReportRepository shiftReportRepository;
    private final UserService userService;
    private final RefundRepository refundRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Override
    public ShiftReportDTO startShift() throws Exception {
        User currentUser = userService.getCurrentUser();
        LocalDateTime shiftStart = LocalDateTime.now();
        LocalDateTime startOfDay = shiftStart.withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDay = shiftStart.withHour(23).withMinute(59).withSecond(59);

        Optional<ShiftReport> existing = shiftReportRepository.findByCashierAndShiftStartBetween(currentUser, startOfDay, endOfDay);
        if(existing.isPresent()) {
            throw new Exception("ShiftReport already exists");
        }

        Branch branch = currentUser.getBranch();

        ShiftReport shiftReport = ShiftReport.builder()
                .cashier(currentUser)
                .shiftStart(shiftStart)
                .branch(branch)
                .build();
        ShiftReport savedShiftReport = shiftReportRepository.save(shiftReport);
        return ShiftReportMapper.toDTO(savedShiftReport);
    }

    @Override
    public ShiftReportDTO endShift(Long shiftReportId, LocalDateTime endDate) throws Exception {
        User currentUser = userService.getCurrentUser();
        ShiftReport shiftReport = shiftReportRepository
                .findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(currentUser)
                .orElseThrow(() -> new Exception("ShiftReport not found"));

        shiftReport.setShiftEnd(endDate);
        List<Refund> refunds = refundRepository.findByCashierIdAndCreatedAtBetween(
                currentUser.getId(),
                shiftReport.getShiftStart(),
                shiftReport.getShiftEnd());

        double totalRefunds = refunds.stream().mapToDouble(
                refund-> refund.getAmount()!=null?
                        refund.getAmount():0.0).sum();

        List<Order> orders = orderRepository.findByCashierAndCreateAtBetween(currentUser,
                shiftReport.getShiftStart(),
                shiftReport.getShiftEnd());

        double totalSales = orders.stream()
                .mapToDouble(Order::getTotalAmount).sum();

        int totalOrders = orders.size();
        double netSales = totalSales-totalRefunds;

        shiftReport.setTotalSales(totalSales);
        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setTotalOrders(totalOrders);
        shiftReport.setNetSale(netSales);
        shiftReport.setRecentOrders(getRecentOrders(orders));
        shiftReport.setTopSellingProducts(getTopSellingProducts(orders));
        shiftReport.setPaymentSummaries(getPaymentSummaries(orders, totalSales));
        shiftReport.setRefunds(refunds);

        ShiftReport savedShiftReport = shiftReportRepository.save(shiftReport);

        return ShiftReportMapper.toDTO(savedShiftReport);
    }


    @Override
    public ShiftReportDTO getShiftReportById(Long id) throws Exception {
        return shiftReportRepository.findById(id)
                .map(ShiftReportMapper::toDTO).orElseThrow(
                ()-> new Exception("Shift report not found with id "+id)
        );
    }

    @Override
    public List<ShiftReportDTO> getAllShiftReports() throws Exception {
        List<ShiftReport> reports = shiftReportRepository.findAll();

        return reports.stream()
                .map(ShiftReportMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDTO> getShiftReportsByBranchId(Long branchId) throws Exception {
        List<ShiftReport> reports = shiftReportRepository.findByBranchId(branchId);

        return reports.stream()
                .map(ShiftReportMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDTO> getShiftReportsByCashierId(Long cashierId) throws Exception {
        List<ShiftReport> reports = shiftReportRepository.findByCashierId(cashierId);

        return reports.stream()
                .map(ShiftReportMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ShiftReportDTO getCurrentShiftProgress(Long cashierId) throws Exception {
        User user = userService.getCurrentUser();
        ShiftReport shiftReport = shiftReportRepository
                .findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(user).orElseThrow(
                        () -> new Exception("No Active Shift found for cashier "+cashierId)
                );

        LocalDateTime now = shiftReport.getShiftStart();
        List<Order> orders = orderRepository.findByCashierAndCreateAtBetween(user, shiftReport.getShiftStart(), now);

        List<Refund> refunds = refundRepository.findByCashierIdAndCreatedAtBetween(user.getId(),shiftReport.getShiftStart(), shiftReport.getShiftEnd());

        double totalRefunds = refunds.stream().mapToDouble(
                refund-> refund.getAmount()!=null?
                        refund.getAmount():0.0).sum();


        double totalSales = orders.stream()
                .mapToDouble(Order::getTotalAmount).sum();

        int totalOrders = orders.size();
        double netSales = totalSales-totalRefunds;

        shiftReport.setTotalSales(totalSales);
        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setTotalOrders(totalOrders);
        shiftReport.setNetSale(netSales);
        shiftReport.setRecentOrders(getRecentOrders(orders));
        shiftReport.setTopSellingProducts(getTopSellingProducts(orders));
        shiftReport.setPaymentSummaries(getPaymentSummaries(orders, totalSales));
        shiftReport.setRefunds(refunds);

        ShiftReport savedShiftReport = shiftReportRepository.save(shiftReport);
        return ShiftReportMapper.toDTO(savedShiftReport);
    }

    @Override
    public ShiftReportDTO getShiftByCashierAndDate(Long cashierId,
                                                   LocalDateTime date) throws Exception {
        User cashier = userRepository.findById(cashierId).orElseThrow(
                ()-> new  Exception("Cashier not found")
        );
        LocalDateTime now = date.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end = date.withHour(23).withMinute(59).withSecond(59);

        ShiftReport report = shiftReportRepository.findByCashierAndShiftStartBetween(
                cashier, now, end
        ).orElseThrow(()-> new Exception("Shift not found"));

        return   ShiftReportMapper.toDTO(report);
    }

    /*----------------------------------------Helper Function----------------------------------------------------------*/
    private List<PaymentSummary> getPaymentSummaries(List<Order> orders, double totalSales) {
        Map<PaymentType, List<Order>> grouped = orders.stream()
                .collect(Collectors.groupingBy(order ->order.getPaymentType()!=null?order
                        .getPaymentType():PaymentType.CASH));

        List<PaymentSummary> paymentSummaries = new ArrayList<>();
        for(Map.Entry<PaymentType, List<Order>> entry : grouped.entrySet()) {
            double amount = entry.getValue().stream()
                    .mapToDouble(Order::getTotalAmount).sum();
            int transactions = entry.getValue().size();
            double percent = (amount/totalSales)*100;

            PaymentSummary ps = new PaymentSummary();
            ps.setType(entry.getKey());
            ps.setTotalAmount(amount);
            ps.setTransactionCount(transactions);
            ps.setPercentage(percent);
        }
        return paymentSummaries;
    }

    private List<Product> getTopSellingProducts(List<Order> orders) {
        Map<Product,Integer> productSalesMap = new HashMap<>();

        for (Order order : orders) {
            for (OrderItem item : order.getItems()) {
                Product product = item.getProduct();
                productSalesMap.put(product, productSalesMap.getOrDefault(product, 0) + item.getQuantity());
            }
        }
        return productSalesMap.entrySet().stream()
                .sorted((a,b)->b.getValue().compareTo(a.getValue()))
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

    }

    private List<Order> getRecentOrders(List<Order> orders) {
        return orders.stream()
                .sorted(Comparator.comparing(Order::getCreateAt).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

}
