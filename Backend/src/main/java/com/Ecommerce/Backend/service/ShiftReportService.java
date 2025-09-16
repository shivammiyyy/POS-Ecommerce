package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.payload.dto.BranchDTO;
import com.Ecommerce.Backend.payload.dto.ShiftReportDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface ShiftReportService {

    ShiftReportDTO startShift() throws Exception;

    ShiftReportDTO endShift(Long shiftReportId, LocalDateTime endDate) throws Exception;

    ShiftReportDTO getShiftReportById(Long id) throws Exception;

    List<ShiftReportDTO> getAllShiftReports() throws Exception;

    List<ShiftReportDTO> getShiftReportsByBranchId(Long branchId) throws Exception;
    List<ShiftReportDTO> getShiftReportsByCashierId(Long cashierId) throws Exception;

    ShiftReportDTO getCurrentShiftProgress(Long cashierId) throws Exception;

    ShiftReportDTO getShiftByCashierAndDate(Long cashierId, LocalDateTime date) throws Exception;
}
