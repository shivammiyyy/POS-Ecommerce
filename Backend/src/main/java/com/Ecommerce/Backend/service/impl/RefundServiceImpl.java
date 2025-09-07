package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.mapper.RefundMapper;
import com.Ecommerce.Backend.model.Branch;
import com.Ecommerce.Backend.model.Order;
import com.Ecommerce.Backend.model.Refund;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.RefundDTO;
import com.Ecommerce.Backend.repository.OrderRepository;
import com.Ecommerce.Backend.repository.RefundRepository;
import com.Ecommerce.Backend.service.RefundService;
import com.Ecommerce.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final RefundRepository refundRepository;

    @Override
    public RefundDTO createRefund(RefundDTO refund) throws Exception {
        User cashier = userService.getCurrentUser();
        Order order = orderRepository.findById(refund.getOrderId()).orElseThrow(
                ()-> new Exception("Order Not Found")
        );
        Branch branch = order.getBranch();
        Refund createRefund = Refund.builder()
                .order(order)
                .branch(branch)
                .cashier(cashier)
                .reason(refund.getReason())
                .amount(refund.getAmount())
                .createdAt(refund.getCreatedAt())
                .build();
        Refund saveRefund = refundRepository.save(createRefund);
        return RefundMapper.toDto(saveRefund);
    }

    @Override
    public List<RefundDTO> getAllRefunds() throws Exception {
        return refundRepository.findAll().stream()
                .map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDTO> getRefundByCashier(Long cashierId) throws Exception {

        return refundRepository.findByCashierId(cashierId).stream()
                .map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDTO> getRefundByShiftReport(Long shiftReportId) throws Exception {
        return refundRepository.findByShiftReportId(shiftReportId).stream()
                .map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<RefundDTO> findByCashierIdAndCreatedAtBetween(Long cashierId, LocalDateTime startDate, LocalDateTime endDate) {
        return refundRepository.findByCashierIdAndCreatedAtBetween(cashierId,startDate,endDate).stream()
                .map(RefundMapper::toDto).collect(Collectors.toList());
    }



    @Override
    public List<RefundDTO> getRefundByBranch(Long branchId) throws Exception {
        return refundRepository.findById(branchId).stream()
                .map(RefundMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public RefundDTO getRefundById(Long refundId) throws Exception {
        return refundRepository.findById(refundId)
                .map(RefundMapper::toDto)
                .orElseThrow(() -> new Exception("Refund not found with id: " + refundId));
    }

    @Override
    public void deleteRefund(Long refundId) throws Exception {
        this.getRefundById(refundId);
        refundRepository.deleteById(refundId);
    }

}
