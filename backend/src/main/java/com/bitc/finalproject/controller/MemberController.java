package com.bitc.finalproject.controller;

import com.bitc.finalproject.data.entity.MemberEntity;
import com.bitc.finalproject.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.hibernate.Session;
import org.springframework.web.bind.annotation.*;

import javax.naming.Name;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class MemberController {
    private final MemberService memberService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Object showLogin(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password
    ) throws Exception{
        Map<Object, Object> result = new HashMap<>();
        int correctId = memberService.countMember(userId, password);
        List<MemberEntity> memberEntities = memberService.allMemberData(userId);
        result.put("login", correctId);
        result.put("name", memberEntities.get(0).getMemberName());
        result.put("grade", memberEntities.get(0).getMemberAuthority());
        return result;
    }

//    회원가입
//    아이디 중복 확인 버튼 클릭
    @RequestMapping(value = "/sign/idCheck", method = RequestMethod.GET)
    public boolean showCheckId(@RequestParam("userId") String userId) throws Exception{
        return memberService.checkId(userId);
    }

//    회원가입 버튼 클릭
    @RequestMapping(value = "/sign/signup", method = RequestMethod.POST)
    public void showSingUp(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address
    ) throws Exception{
        MemberEntity memberEntity = new MemberEntity(userId, password, name, email, phone, address);
        memberService.saveMember(memberEntity);
    }
}