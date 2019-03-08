package com.cbhat.monthly.dao;

import java.sql.Types;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cbhat.monthly.entities.Owner;
import com.cbhat.monthly.entities.Transaction;

@Component
public class OwnerDao {
	
	private String insertOwnerSql = "INSERT INTO allmonthly.owner ( household, owner, first, last, email, "
			+ "phone, password, creation_date, last_modified ) VALUES ( :household, :owner, :first, :last, :email,"
			+ ":phone, :password, :creation_date, :last_modified );";
	
	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	
	@Transactional (readOnly = false)
	public void insertOwner(Owner owner) {
		
		MapSqlParameterSource param = new MapSqlParameterSource();
		Date now = new Date();
		
		param.addValue("household", owner.getHousehold())
				.addValue("owner", owner.getOwner())
				.addValue("first", owner.getFirst())
				.addValue("last", owner.getLast())
				.addValue("email", owner.getEmail())
				.addValue("phone", owner.getPhone())
				.addValue("password", owner.getPassword())
				.addValue("creation_date", now, Types.DATE)
				.addValue("last_modified", now, Types.DATE);
			
		namedParameterJdbcTemplate.update(insertOwnerSql, param);

	}

	public void updateOwner(Owner owner) {
		// TODO Auto-generated method stub
		
	}

	public void deleteOwner(int ownerId) {
		// TODO Auto-generated method stub
		
	}

	public Transaction getOwner(int ownerId) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Owner> getAllOwners() {
		// TODO Auto-generated method stub
		return null;
	}

}
