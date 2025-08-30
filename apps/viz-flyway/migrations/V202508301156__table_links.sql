CREATE TABLE
  nav_links (
    nav_link_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    uuid UUID NOT NULL DEFAULT gen_random_uuid () UNIQUE,
    content VARCHAR(255) NOT NULL,
    class_name VARCHAR(255),
    url VARCHAR(70) NOT NULL DEFAULT '#',
    sort_order INT NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_nav_links_user FOREIGN KEY (user_id) REFERENCES users (user_id)
  );

CREATE INDEX idx_nav_links_uuid ON nav_links (uuid);

CREATE INDEX idx_nav_links_deleted_at ON nav_links (deleted_at);

CREATE INDEX idx_nav_links_created_at ON nav_links (created_at);

CREATE INDEX idx_nav_links_sort_order ON nav_links (sort_order);