const roleNavigationMap = new Map();
roleNavigationMap.set('ROLE_MANAGER_IT', [
    {
        text: "Dashboard",
        href: "/main-page/dashboard"
    },
    {
        text: "Pracownicy",
        href: "/main-page/employees"
    },
    {
        text: "Urządzenia",
        href: "/main-page/all-assets"
    }
]);

roleNavigationMap.set('ROLE_EMPLOYEE_IT', [
    {
        text: "Zamówienia",
        href: "/main-page/orders"
    },
    {
        text: "Raporty",
        href: "/main-page/reports"
    },
    {
        text: "Urządzenia",
        href: "/main-page/all-assets"
    }
]);

roleNavigationMap.set('ROLE_MANAGER_DHL', [
    {
        text: "Twoje urządzenia",
        href: "/main-page/your-assets"
    },
    {
        text: "Twoje zamówienia",
        href: "/main-page/your-orders"
    },
    {
        text: "Stworzone zamówienia",
        href: "/main-page/created-orders"
    }
]);

roleNavigationMap.set('ROLE_EMPLOYEE_DHL', [
    {
        text: "Twoje urządzenia",
        href: "/main-page/your-assets"
    },
    {
        text: "Twoje zamówienia",
        href: "/main-page/your-orders"
    },
]);

export const translateRole = roleName => {
    switch (roleName) {
        case "ROLE_MANAGER_IT":
            return "Manager It";
        case "ROLE_EMPLOYEE_IT":
            return "Pracownik It";
        case "ROLE_MANAGER_DHL":
            return "Manager Dhl";
        case "ROLE_EMPLOYEE_DHL":
            return "Pracownik Dhl";
        default:
            return "Role not found";
    }
}

export const isEmployeeIt = user => {
    return user.role === "ROLE_EMPLOYEE_IT";
}

export const isManagerIt = user => {
    return user.role === "ROLE_MANAGER_IT";
}

export default roleNavigationMap;