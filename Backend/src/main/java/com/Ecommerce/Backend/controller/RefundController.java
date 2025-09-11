package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.payload.dto.RefundDTO;
import com.Ecommerce.Backend.payload.response.ApiResponse;
import com.Ecommerce.Backend.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refunds")
public class RefundController {
    private final RefundService refundService;

    @PostMapping()
    public ResponseEntity<RefundDTO> createRefund(@RequestBody RefundDTO refundDTO) throws Exception {
        RefundDTO refund = refundService.createRefund(refundDTO);
        return ResponseEntity.ok(refund);
    }

    @GetMapping()
    public ResponseEntity<List<RefundDTO>> getAllRefund() throws Exception {
        return ResponseEntity.ok(refundService.getAllRefunds());
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<RefundDTO>> getRefundByCashier(@PathVariable Long cashierId) throws Exception {
        return ResponseEntity.ok(refundService.getRefundByCashier(cashierId));
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<RefundDTO>> getRefundByBranch(@PathVariable Long branchId) throws Exception {
        return ResponseEntity.ok(refundService.getRefundByBranch(branchId));
    }

    @GetMapping("/shift/{shiftId}")
    public ResponseEntity<List<RefundDTO>> getRefundByShift(@PathVariable Long shiftId) throws Exception {
        return ResponseEntity.ok(refundService.getRefundByShiftReport(shiftId));
    }


    @GetMapping("/cashier/{cashierId}/range")
    public ResponseEntity<List<RefundDTO>> getRefundByCashierAndDateRange(
            @PathVariable Long cashierId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(refundService.findByCashierIdAndCreatedAtBetween(cashierId, startDate, endDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RefundDTO> getRefundById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(refundService.getRefundById(id));
    }

    @PostMapping("delete/{id}")
    public ResponseEntity<ApiResponse> deleteRefundById(@PathVariable Long id) throws Exception {
        refundService.deleteRefund(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("success in delete refund");
        return ResponseEntity.ok(apiResponse);
    }







}
