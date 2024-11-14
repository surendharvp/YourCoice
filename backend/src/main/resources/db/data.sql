-- Insert sample skills
INSERT INTO skills (name, category, description, hourly_rate) VALUES
('Web Development', 'Technology', 'Full-stack web development services including frontend and backend development', 50),
('Graphic Design', 'Design', 'Professional graphic design services for branding, marketing materials, and digital assets', 40),
('Language Teaching', 'Education', 'Language tutoring and instruction in multiple languages', 30),
('Home Repair', 'Maintenance', 'General home maintenance and repair services', 45),
('Photography', 'Creative', 'Professional photography services for events, portraits, and commercial use', 60),
('Digital Marketing', 'Marketing', 'Social media management, SEO, and content marketing', 45),
('Personal Training', 'Health', 'Personalized fitness training and nutrition guidance', 35),
('Music Lessons', 'Education', 'Musical instrument instruction and voice training', 40),
('Writing & Editing', 'Content', 'Content writing, copywriting, and editing services', 35),
('Life Coaching', 'Personal Development', 'Career and personal development coaching', 55);

-- Insert sample users (password is 'password123' hashed with BCrypt)
INSERT INTO users (email, password, name, time_balance, location, bio, rating) VALUES
('john@example.com', '$2a$10$rS.rJMR6YZvwxHG6hHzW8.KNFv4QK.WJ8l8K6z5pfQW.TWzUVx9hy', 'John Doe', 20, 'New York, NY', 'Experienced web developer with a passion for creating beautiful, functional websites', 4.8),
('jane@example.com', '$2a$10$rS.rJMR6YZvwxHG6hHzW8.KNFv4QK.WJ8l8K6z5pfQW.TWzUVx9hy', 'Jane Smith', 15, 'Los Angeles, CA', 'Professional graphic designer specializing in brand identity and UI/UX design', 4.9),
('bob@example.com', '$2a$10$rS.rJMR6YZvwxHG6hHzW8.KNFv4QK.WJ8l8K6z5pfQW.TWzUVx9hy', 'Bob Wilson', 25, 'Chicago, IL', 'Certified language teacher with expertise in Spanish and French', 4.7),
('alice@example.com', '$2a$10$rS.rJMR6YZvwxHG6hHzW8.KNFv4QK.WJ8l8K6z5pfQW.TWzUVx9hy', 'Alice Brown', 30, 'San Francisco, CA', 'Professional photographer with 10 years of experience', 4.6),
('david@example.com', '$2a$10$rS.rJMR6YZvwxHG6hHzW8.KNFv4QK.WJ8l8K6z5pfQW.TWzUVx9hy', 'David Chen', 18, 'Seattle, WA', 'Digital marketing specialist focusing on growth strategies', 4.5);

-- Link users with skills
INSERT INTO user_skills (user_id, skill_id, proficiency_level, hourly_rate, verified) VALUES
(1, 1, 'Expert', 60, true),
(1, 2, 'Intermediate', 45, true),
(2, 2, 'Expert', 50, true),
(2, 6, 'Expert', 45, true),
(3, 3, 'Expert', 35, true),
(3, 8, 'Advanced', 45, true),
(4, 5, 'Expert', 65, true),
(5, 6, 'Expert', 50, true);

-- Insert sample requests
INSERT INTO requests (user_id, title, description, estimated_hours, status, category, skill_id, remote_possible, budget_range_min, budget_range_max) VALUES
(1, 'E-commerce Website Development', 'Need a full-stack developer to build an e-commerce website with payment integration', 40, 'open', 'Technology', 1, true, 1800, 2400),
(2, 'Brand Identity Design', 'Looking for a graphic designer to create a complete brand identity package', 20, 'open', 'Design', 2, true, 800, 1000),
(3, 'Spanish Language Tutoring', 'Need a Spanish tutor for business Spanish lessons', 10, 'open', 'Education', 3, true, 300, 400),
(4, 'Event Photography', 'Photographer needed for a corporate event next month', 8, 'open', 'Creative', 5, false, 400, 600),
(5, 'Social Media Strategy', 'Seeking a digital marketing expert to develop and implement a social media strategy', 15, 'open', 'Marketing', 6, true, 600, 800);

-- Insert sample bids
INSERT INTO bids (request_id, provider_id, amount, estimated_hours, hourly_rate, message, status) VALUES
(1, 2, 2000, 40, 50, 'I have extensive experience in e-commerce development and can deliver within your timeline.', 'pending'),
(1, 3, 2200, 44, 50, 'I can build a secure and scalable e-commerce platform for your business.', 'pending'),
(2, 1, 900, 20, 45, 'I would love to help create your brand identity with my design expertise.', 'pending'),
(3, 4, 350, 10, 35, 'Native Spanish speaker with business Spanish teaching experience.', 'pending'),
(4, 5, 500, 8, 62.5, 'Professional event photographer with high-end equipment and experience.', 'pending');

-- Insert sample reviews
INSERT INTO reviews (reviewer_id, reviewed_id, request_id, rating, comment) VALUES
(1, 2, 1, 5, 'Excellent work on the website development. Very professional and communicative.'),
(2, 1, 2, 4, 'Great design work, delivered on time. Would recommend.'),
(3, 4, 3, 5, 'Amazing Spanish teacher, very patient and knowledgeable.'),
(4, 5, 4, 4, 'Good photography work, captured all the important moments.');

-- Insert sample messages
INSERT INTO messages (sender_id, recipient_id, request_id, content) VALUES
(1, 2, 1, 'Hi, I''m interested in discussing the e-commerce project further.'),
(2, 1, 1, 'I''d be happy to discuss the details. When would be a good time for a call?'),
(3, 4, 3, 'Hello, I''d like to schedule our first Spanish lesson.'),
(4, 3, 3, 'Great! I''m available next week. What days work best for you?');

-- Insert sample notifications
INSERT INTO notifications (user_id, type, content, action_url) VALUES
(1, 'bid', 'You have received a new bid on your e-commerce project', '/requests/1'),
(2, 'message', 'New message regarding the brand identity project', '/messages'),
(3, 'review', 'You have received a new 5-star review', '/profile'),
(4, 'booking', 'Your photography session has been confirmed', '/bookings'),
(5, 'payment', 'Payment received for social media strategy project', '/transactions');