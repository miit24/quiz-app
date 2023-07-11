package com.company.quiz.security;


import com.company.quiz.Dao.UserDao;
import com.company.quiz.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyCustomUserDetailService implements UserDetailsService {

    @Autowired
    UserDao userDao;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        System.out.println("my :" + username);
        User user = userDao.findByEmail(username);
        if(user == null) throw  new UsernameNotFoundException("User doesnt exist");
//        System.out.println(user);
//        System.out.println(user.getAuthorities());
        return user;
    }
}
