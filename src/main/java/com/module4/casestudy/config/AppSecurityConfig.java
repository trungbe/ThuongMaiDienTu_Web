package com.module4.casestudy.config;


//import casestudy1module4.onlinemall.service.loginUser.ILoginUserService;
//import casestudy1module4.onlinemall.service.loginUser.ILoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

//    @Autowired
//    private ILoginUserService loginUserService;

    @Autowired
    private LoginSuccessHandler productSuccessHandle;


    //lay du lieu user tu trong DB
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService((UserDetailsService) loginUserService).passwordEncoder(NoOpPasswordEncoder.getInstance());
//    }

    //phan quyen theo tung tai khoan
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/admin/**").hasRole("ADMIN")
                .and()
                .authorizeRequests().antMatchers("/user/**").hasRole("USER")
                .and()
                .formLogin()
                .and()
                .formLogin().successHandler(productSuccessHandle)
                .and()
                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .and()
                .exceptionHandling().accessDeniedPage("/khongcoquyen");
        http.csrf().disable();
    }
}