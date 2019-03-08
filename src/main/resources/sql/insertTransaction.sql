INSERT INTO allmonthly.transaction (

	description,
	event_tag,
	category,
	type,
	event_date,
	modification_date,
	amount,
	amount_usd,
	currency,
	fin_entity_from,
	fin_entity_to
	
) VALUES (

	:description,
	:event_tag,
	:category,
	:type,
	:event_date,
	:modification_date,
	:amount,
	:amount_usd,
	:currency,
	:fin_entity_from,
	:fin_entity_to
	
);
