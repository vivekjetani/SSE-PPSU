-- Insert sample admin user
INSERT INTO users (name, email, password_hash, role) VALUES 
('Admin User', 'admin@college.edu', '$2a$10$example_hash', 'admin'),
('John Doe', 'john@student.edu', '$2a$10$example_hash', 'student'),
('Jane Smith', 'jane@student.edu', '$2a$10$example_hash', 'student');

-- Insert sample notifications
INSERT INTO notifications (title, body, created_by) VALUES 
('Welcome to Student Dashboard', 'Your one-stop solution for tracking attendance and exam eligibility!', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Exam Schedule Updated', 'Please check the latest exam schedule for upcoming internal assessments.', (SELECT id FROM users WHERE role = 'admin' LIMIT 1)),
('Attendance Reminder', 'Maintain 75% attendance for external exam eligibility.', (SELECT id FROM users WHERE role = 'admin' LIMIT 1));

-- Insert sample analytics
INSERT INTO analytics (date, views, unique_users) VALUES 
(CURRENT_DATE, 45, 12),
(CURRENT_DATE - INTERVAL '1 day', 38, 15),
(CURRENT_DATE - INTERVAL '2 days', 52, 18);
