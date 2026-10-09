package com.gaurav.delicia.dto;

public record CustomCakeRequest(
        String size,
        String flavour,
        String shape,
        int tiers,
        String message,
        String referenceUrl
) {}