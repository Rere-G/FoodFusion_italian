-- FoodFusion database (19 tables, 22 relationships), MySQL 8 / MariaDB (XAMPP)
-- Generated from docs/foodfusion-erd.dbml.
-- draw.io: Arrange > Insert > Advanced > SQL, paste this file, choose MySQL, Insert.
-- Tables are listed so that each one only refers to tables created before it.

CREATE TABLE users (
  user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  location VARCHAR(60) NULL,
  failed_attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
  lockout_until DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE password_resets (
  reset_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (reset_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE login_attempts (
  attempt_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NULL,
  email_entered VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  succeeded BOOLEAN NOT NULL,
  attempted_at DATETIME NOT NULL,
  PRIMARY KEY (attempt_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE regions (
  region_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  name_it VARCHAR(50) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (region_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE recipes (
  recipe_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  region_id TINYINT UNSIGNED NOT NULL,
  title VARCHAR(120) NOT NULL,
  title_en VARCHAR(120) NOT NULL,
  description TEXT NULL,
  course ENUM('antipasto','primo','secondo','contorno','dolce') NOT NULL,
  difficulty ENUM('easy','medium','hard') NOT NULL,
  time_minutes SMALLINT UNSIGNED NOT NULL,
  time_note VARCHAR(60) NULL,
  base_servings TINYINT UNSIGNED NOT NULL,
  image_path VARCHAR(255) NULL,
  image_alt VARCHAR(255) NOT NULL,
  cutout_path VARCHAR(255) NULL,
  featured_order TINYINT UNSIGNED NULL UNIQUE,
  region_pick_order TINYINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (recipe_id),
  UNIQUE KEY uq_region_pick (region_id, region_pick_order),
  FOREIGN KEY (region_id) REFERENCES regions (region_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE recipe_ingredients (
  ingredient_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  recipe_id INT UNSIGNED NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL,
  name VARCHAR(120) NOT NULL,
  metric_qty DECIMAL(8,2) NULL,
  metric_unit VARCHAR(10) NOT NULL,
  us_qty DECIMAL(8,2) NULL,
  us_unit VARCHAR(10) NOT NULL,
  note VARCHAR(60) NULL,
  PRIMARY KEY (ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE recipe_steps (
  step_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  recipe_id INT UNSIGNED NOT NULL,
  step_number TINYINT UNSIGNED NOT NULL,
  instruction TEXT NOT NULL,
  time_minutes SMALLINT UNSIGNED NULL,
  PRIMARY KEY (step_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE dietary_tags (
  dietary_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(20) NOT NULL UNIQUE,
  label VARCHAR(40) NOT NULL,
  PRIMARY KEY (dietary_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE recipe_dietary (
  recipe_id INT UNSIGNED NOT NULL,
  dietary_id TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (recipe_id, dietary_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE,
  FOREIGN KEY (dietary_id) REFERENCES dietary_tags (dietary_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE community_posts (
  post_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  region_id TINYINT UNSIGNED NOT NULL,
  type ENUM('recipe','tip','story') NOT NULL,
  title VARCHAR(100) NOT NULL,
  body TEXT NOT NULL,
  ingredients_text TEXT NULL,
  steps_text TEXT NULL,
  place VARCHAR(60) NULL,
  area VARCHAR(60) NULL,
  image_path VARCHAR(255) NULL,
  image_alt VARCHAR(255) NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (region_id) REFERENCES regions (region_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comments (
  comment_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (post_id) REFERENCES community_posts (post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE post_likes (
  user_id INT UNSIGNED NOT NULL,
  post_id INT UNSIGNED NOT NULL,
  liked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES community_posts (post_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE challenges (
  challenge_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT NULL,
  rules TEXT NULL,
  starts_on DATE NOT NULL,
  closes_on DATE NOT NULL,
  PRIMARY KEY (challenge_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE challenge_entries (
  entry_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  challenge_id INT UNSIGNED NOT NULL,
  post_id INT UNSIGNED NOT NULL UNIQUE,
  entered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (entry_id),
  FOREIGN KEY (challenge_id) REFERENCES challenges (challenge_id),
  FOREIGN KEY (post_id) REFERENCES community_posts (post_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE contact_messages (
  message_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NULL,
  dish_region_id TINYINT UNSIGNED NULL,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(255) NOT NULL,
  reason ENUM('enquiry','recipe_request','feedback') NOT NULL,
  subject VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  dish_name VARCHAR(100) NULL,
  rating TINYINT UNSIGNED NULL,
  status ENUM('new','replied') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (message_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL,
  FOREIGN KEY (dish_region_id) REFERENCES regions (region_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE team_members (
  member_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  favourite_recipe_id INT UNSIGNED NULL,
  name VARCHAR(80) NOT NULL,
  role VARCHAR(80) NOT NULL,
  role_it VARCHAR(80) NOT NULL,
  bio TEXT NULL,
  home_town VARCHAR(60) NULL,
  PRIMARY KEY (member_id),
  FOREIGN KEY (favourite_recipe_id) REFERENCES recipes (recipe_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE resources (
  resource_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  recipe_id INT UNSIGNED NULL,
  category ENUM('culinary','educational') NOT NULL,
  kind ENUM('recipe_card','guide','infographic','video') NOT NULL,
  title VARCHAR(120) NOT NULL,
  title_it VARCHAR(120) NULL,
  description TEXT NULL,
  file_path VARCHAR(255) NULL,
  file_type VARCHAR(10) NULL,
  file_size_kb INT UNSIGNED NULL,
  video_url VARCHAR(255) NULL,
  video_channel VARCHAR(80) NULL,
  duration VARCHAR(8) NULL,
  thumbnail_path VARCHAR(255) NULL,
  skill VARCHAR(40) NULL,
  PRIMARY KEY (resource_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE events (
  event_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  host_member_id INT UNSIGNED NULL,
  region_id TINYINT UNSIGNED NULL,
  title VARCHAR(100) NOT NULL,
  title_it VARCHAR(100) NOT NULL,
  description TEXT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  location VARCHAR(100) NOT NULL,
  image_path VARCHAR(255) NULL,
  PRIMARY KEY (event_id),
  FOREIGN KEY (host_member_id) REFERENCES team_members (member_id) ON DELETE SET NULL,
  FOREIGN KEY (region_id) REFERENCES regions (region_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE news_articles (
  news_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  author_member_id INT UNSIGNED NULL,
  title VARCHAR(120) NOT NULL,
  tag VARCHAR(30) NOT NULL,
  icon VARCHAR(40) NULL,
  summary VARCHAR(300) NOT NULL,
  body TEXT NULL,
  image_path VARCHAR(255) NULL,
  image_alt VARCHAR(255) NULL,
  published_on DATE NOT NULL,
  PRIMARY KEY (news_id),
  FOREIGN KEY (author_member_id) REFERENCES team_members (member_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
