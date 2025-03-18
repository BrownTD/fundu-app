INSERT INTO users (email, password, role, first_name, last_name, created_at, updated_at)
	VALUES 
	('john.doe@example.com', 'password123', 'manager', 'John', 'Doe', NOW(), NOW()),
	('jane.smith@example.com', 'password456', 'member', 'Jane', 'Smith', NOW(), NOW()),
	('mike.brown@example.com', 'password789', 'donor', 'Mike', 'Brown', NOW(), NOW());
SELECT* FROM users;

INSERT INTO organizations (org_name, manager_email, created_at, updated_at, school, description, manager_uid)
	VALUES 
	('Helping Hands', 'john.doe@example.com', NOW(), NOW(), 'UNC Charlotte', 'Non-profit organization for community aid.', 1);
SELECT* FROM organizations;

INSERT INTO organization_members (user_id, organization_id, role, joined_at)
	VALUES
	(1, 1, 'manager', NOW()),  -- John Doe as manager
	(2, 1, 'member', NOW());

-- reorder columns for readability
ALTER TABLE organization_members
MODIFY COLUMN organization_id INT NOT NULL FIRST,
MODIFY COLUMN org_member_id INT NOT NULL AUTO_INCREMENT AFTER organization_id,
MODIFY COLUMN user_id INT NOT NULL AFTER org_member_id;

SELECT * FROM organization_members;

INSERT INTO campaigns (user_id, org_name, description, donation_goal, current_donations, created_at, updated_at, organization_id, ended_at, title)
	VALUES 
	(1, 'Helping Hands', 'Annual food drive for the local community.', 5000, 1500.00, NOW(), NOW(), 1, NULL, 'Food Drive 2025');

-- Rename user_id to created_by
ALTER TABLE campaigns
CHANGE COLUMN user_id created_by INT NOT NULL;

-- Reorder the columns
ALTER TABLE campaigns
MODIFY COLUMN organization_id INT NOT NULL FIRST,
MODIFY COLUMN org_name VARCHAR(100) NOT NULL AFTER organization_id,
MODIFY COLUMN campaign_id INT NOT NULL AUTO_INCREMENT AFTER org_name,
MODIFY COLUMN title VARCHAR(45) NOT NULL AFTER campaign_id,
MODIFY COLUMN created_by INT NOT NULL AFTER created_at;

SELECT * FROM campaigns;

INSERT INTO donations (campaign_id, user_id, amount, donation_date)
	VALUES 
	(1, 3, 100.00, NOW());

ALTER TABLE donations
MODIFY COLUMN campaign_id INT NOT NULL FIRST;

SELECT * FROM donations;

INSERT INTO transactions (donation_id, amount, transaction_date, transaction_status)
	VALUES 
	(1, 100.00, NOW(), 'completed');

SELECT * FROM transactions;

-- CRUD TEST
INSERT INTO users (email, password, role, first_name, last_name, created_at) 
	VALUES ('sally.doe@example.com', 'password123', 'donor', 'Jane', 'Doe', NOW());
SELECT * FROM users;
SELECT * FROM campaigns WHERE organization_id = 1;
UPDATE donations SET amount = 300.00 WHERE donation_id = 1;
SELECT * FROM donations WHERE donation_id=1;
DELETE FROM users WHERE email= 'sally.doe@example.com';
SELECT * FROM users
-- Completed Successfully

