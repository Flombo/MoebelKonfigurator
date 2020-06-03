package app.aeom.controller;

import app.aeom.data.entity.User;
import app.aeom.data.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class IndexController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/login")
    public String login() {
        return "authentification";
    }

    @GetMapping("/user")
    public String user() {
        return "authentification";
    }

    @RequestMapping("/")
    public String index() {
        return "furnitureConfiguration";
    }

    @PostMapping("/register")
    public String register(
            Model model,
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password
    ) {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
        model.addAttribute("message", "<p class='success'>Account successfully registrated!<p>");
        return "authentification";
    }

}
