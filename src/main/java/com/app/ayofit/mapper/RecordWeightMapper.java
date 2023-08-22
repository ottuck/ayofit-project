package com.app.ayofit.mapper;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.app.ayofit.model.RecordWeightDTO;

@Mapper
public interface RecordWeightMapper {
    List<RecordWeightDTO> findAll();

    RecordWeightDTO findByDateAndId(@Param("rWeightDate") Date rWeightDate, @Param("rId") String rId);

    int insert(RecordWeightDTO record);

    int update(RecordWeightDTO record);

    RecordWeightDTO findLatestByRId(String rId);

    void delete(@Param("rId") String rId, @Param("rWeightDate") Date rWeightDate);

}

