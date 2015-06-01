<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ include file="include/head.jspf" %>
<body class="paybody">
<div id="cart-container">
    <div id="top">
       <div class="top-content">
            <div class="logo">JADO 통합 장바구니</div>
            <div class="logout">로그아웃</div>
        </div>
    </div> 
    <div id="main">
       <div class="main-header">
            <div class="name">aaa@aaa.com님 반갑습니다</div>
            <div class="store-count">
                <div class="title">장바구니에 담은 가게 개수</div>
                <div class="amount">10</div>
            </div>
            <div class="total-count">
                <div class="title">장바구니에 담은 물건의 총 개수</div>
                <div class="amount">20</div>
            </div>
        </div>
        <div class="main-body">
            <div class="title">장바구니</div>
            <div class="product-container">
                <div class="product">
                    <div class="image"><img src="" alt=""></div>
                    <div class="name">맛있는 햄버거</div>
                    <div class="shop">태호네 샵&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
                        <div class="price">단가 : 10000</div>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
                        <div class="amount">수량 : 3</div>
                    </div>
                    <div class="paybtn">구매</div>
                </div>
                <div class="product">
                    <div class="image"><img src="" alt=""></div>
                    <div class="name">맛있는 햄버거</div>
                    <div class="shop">태호네 샵&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
                        <div class="price">단가 : 10000</div>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
                        <div class="amount">수량 : 3</div>
                    </div>
                    <div class="paybtn">구매</div>
                </div>
                
            </div>
        </div>
    </div>
</div>
</body>
<script src="/js/jado.js"></script>
</html>