package com.placement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String verificationLink){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setText(("Click the link given below to verify your email address: "+ verificationLink));
        message.setSubject("Verify your email address");
        mailSender.send(message);
    }
}
