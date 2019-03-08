package com.cbhat.monthly.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbhat.monthly.dao.OwnerDao;
import com.cbhat.monthly.entities.Owner;
import com.cbhat.monthly.entities.Transaction;

@RestController
@RequestMapping(path="/owner")
public class OwnerController {
	
	@Autowired
	private OwnerDao ownerDao;

	@PostMapping(path="/add")
	public void addOwner(@RequestBody Owner owner) {
		ownerDao.insertOwner(owner);
	}

	@PatchMapping(path="/update")
	public void updateOwner(@RequestBody Owner owner) {
		ownerDao.updateOwner(owner);
	}

	@DeleteMapping(path="/delete/{ownerId}")
	public void deleteOwner(@PathVariable int ownerId) {
		ownerDao.deleteOwner(ownerId);
	}

	@GetMapping(path="/get/{ownerId}")
	public Transaction getOwner(@PathVariable int ownerId) {
		return ownerDao.getOwner(ownerId);
	}

	@GetMapping("/getAll")
	public List<Owner> addOwners() {
		return ownerDao.getAllOwners();
	}
	
}
