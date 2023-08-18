<<<<<<< HEAD
package com.app.ayofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.app.ayofit.model.RecordDTO;

@Mapper
public interface RecordMapper {
	
	List<RecordDTO> getAllFoodInfo();
	RecordDTO getFoodInfoById(String n_no);
	List<RecordDTO> searchFoodByName(String n_food_name);
}
=======
package com.app.ayofit.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RecordMapper {

}
>>>>>>> 1fedae1c4af3b3025f934a96329a7dce5fd2341a
