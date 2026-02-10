import type { WorkExperience } from "../types";

export const WORK_EXPERIENCES: WorkExperience[] = [
    {
        id: 1,
        company: "Teleperformance",
        location: "Jaipur (Remote)",
        client: "HMD Global",
        clientLogo: "/logos/hmd_global_logo.jpg",
        role: "Technical Support Executive",
        period: "September 2024 - October 2025",
        responsibilities: [
            "Provided first-line technical support for enterprise customers across device management, security features, and connectivity services",
            "Diagnosed configuration and service-related issues, guided customers through resolution steps, and supported onboarding and activation",
            "Documented cases and collaborated with internal teams to escalate complex issues and ensure timely resolution"
        ]
    },
    {
        id: 2,
        company: "TTEC",
        location: "Ahmedabad (Remote)",
        client: "eBay Australia",
        clientLogo: "/logos/ebay_logo.jpg",
        role: "Fraud Prevention Analyst",
        period: "May 2023 - April 2024",
        responsibilities: [
            "Monitored and assessed seller account activity to identify potential fraud, policy abuse, and high-risk behaviours across the eBay marketplace",
            "Investigated complex cases involving disputes and seller performance anomalies, applying trust and safety rules to recommend corrective actions",
            "Analysed seller metrics and transaction patterns using CRM"
        ]
    },
    {
        id: 3,
        company: "24/7.AI",
        location: "Bengaluru (On-site)",
        client: "Optus",
        clientLogo: "/logos/optus_logo.jpg",
        role: "Sales Advisor",
        period: "November 2022 - May 2023",
        responsibilities: [
            "Engaged with Australian consumers to upsell mobile and broadband plans, selling new devices and bundled plans to improve customer retention",
            "Promoted additional services including international roaming and device insurance to drive cross-sales opportunities",
            "Maintained high conversion rate for sales inquiries and consistently achieved KPIs"
        ]
    },
    {
        id: 4,
        company: "Concentrix",
        location: "Ranchi (On-Site)",
        client: "MakeMyTrip",
        clientLogo: "/logos/makemytripcom_logo.jpg",
        role: "Sales Advisor",
        period: "February 2022 - October 2022",
        responsibilities: [
            "Assisted domestic and international customers in selecting travel packages and upselling premium plans using GDS (Global Distribution System)",
            "Negotiated reissuance and refunds to maximize company revenue while ensuring customer satisfaction",
            "Maintained detailed records of customer interactions in CRM system to enhance future sales opportunities"
        ]
    }
];
