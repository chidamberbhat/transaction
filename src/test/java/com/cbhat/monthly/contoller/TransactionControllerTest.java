package com.cbhat.monthly.contoller;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class TransactionControllerTest {

	private TransactionController tc;
	
	@Before
	public void setUp() throws Exception {
		tc = new TransactionController();
	}

	@Test
	public void test1() {
		
		assertEquals(15, tc.addTwoNum(5, 10));
		
		assertNotEquals(5, tc.addTwoNum(1, 10));
		
		
	}

}
