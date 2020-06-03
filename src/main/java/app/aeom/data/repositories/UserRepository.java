package app.aeom.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import app.aeom.data.entity.User;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}
