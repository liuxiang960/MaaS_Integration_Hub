const apiServeData = {
  apiServe161: [
    {
      method: "POST",
      appName: "Service-SMTP",
      description: "send email",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "fromMail",
          description: "from Mail",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "fromTitle",
          description: "mail title",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "fromContent",
          description: "content of email",
          id: "4",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "targetMail",
          description: "target mail",
          id: "5",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/smtp/send",
      methodApi: "POST",
      apiPath: "/smtp/send",
      domain: "",
      name: "send email",
      id: "1601",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "SMTP-Api",
        description: "Service-SMTP API",
        id: "161",
      },
    },
    {
      method: "POST",
      appName: "Service-SMTP",
      description: "revoke email",
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "SMTP-Api",
        description: "Service-SMTP API",
        id: "161",
      },
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "mailId",
          description: "mail id",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/smtp/revoke",
      methodApi: "POST",
      apiPath: "/smtp/revoke",
      domain: "",
      name: "revoke email",
      id: "1602",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
  ],
  apiServe171: [
    {
      method: "POST",
      appName: "MaaS-Backend",
      description: "Query member information",
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Backend-Api",
        description: "MaaS-Backend API",
        id: "171",
      },
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/member/getMemberInfo",
      methodApi: "POST",
      apiPath: "/member/getMemberInfo",
      domain: "",
      name: "Query member information",
      id: "1701",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Backend-Api",
        description: "MaaS-Backend API",
        id: "171",
      },
      method: "POST",
      appName: "MaaS-Backend",
      description: "Manually submit real-name authentication information",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "realName",
          description: "actual name",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "identificationType",
          description: "type of certificate",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "identificationNo",
          description: "license number",
          id: "4",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "frontUrl",
          description: "protrait photo",
          id: "5",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "backUrl",
          description: "reverse photo",
          id: "6",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/member/commitVerifyInfo",
      methodApi: "POST",
      apiPath: "/member/commitVerifyInfo",
      domain: "",
      name: "Manually submit real-name authentication information",
      id: "1702",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Backend-Api",
        description: "MaaS-Backend API",
        id: "171",
      },
      method: "POST",
      appName: "MaaS-Backend",
      description: "my order list",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "businessType",
          description:
            "Business type 10-Bus 11-Light rail 12-Motorcycle 13-Online car-hailing 14-Parking lot 15-Small bicycle 22-Physical card 23 Air recharge 30-Commodity exchange 33-Card coupon",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "orderStatus",
          description:
            "0-Appointed 1-In progress 2-Pending payment 3-Paid 4-Pending evaluation 5-Evaluated 6-Cancelled 7-Completed 8-Refunding 9-Refunded 10-Reserving 11-Reservation failed 12-Payment in progress",
          id: "3",
          addr: "Body",
          type: "int",
        },
      ],
      timeOut: 10,
      path: "/order/queryOrderList",
      methodApi: "POST",
      apiPath: "/order/queryOrderList",
      domain: "",
      name: "my order list",
      id: "1703",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Backend-Api",
        description: "MaaS-Backend API",
        id: "171",
      },
      method: "POST",
      appName: "MaaS-Backend",
      description:
        "Smart travel planning, used to plan travel routes, including public transportation, light rail, online car-hailing, cycling, walking, combined plans, etc.",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "origin",
          description: "Latitude and longitude of starting point",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "originAddress",
          description: "Detailed address of starting point",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "destination",
          description: "Longitude and latitude of end point",
          id: "4",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "destinationAddress",
          description: "End point detailed address",
          id: "5",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/travel/planning",
      methodApi: "POST",
      apiPath: "/travel/planning",
      domain: "",
      name: "Smart Planning",
      id: "1704",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
  ],
  apiServe101: [
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Bus-Api",
        description: "MSP-Bus API",
        id: "101",
      },
      method: "POST",
      appName: "MSP-Bus",
      description:
        "Obtain data such as bus license plate, driving direction, fare, line name, etc.",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "no",
          name: "carNum",
          description: "license plate number",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/ioc/busbasicinfolist",
      methodApi: "POST",
      apiPath: "/api/ioc/busbasicinfolist",
      domain: "",
      name: "Obtain basic bus information",
      id: "1001",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-256",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Bus-Api",
        description: "MSP-Bus API",
        id: "101",
      },
      method: "POST",
      appName: "MSP-Bus",
      description:
        "Obtain real-time latitude and longitude information of buses",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "no",
          name: "carId",
          description: "vehicle ID",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/ioc/buslocationget",
      methodApi: "POST",
      apiPath: "/api/ioc/buslocationget",
      domain: "",
      name: "Get real-time bus information",
      id: "1002",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-256",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Bus-Api",
        description: "MSP-Bus API",
        id: "101",
      },
      method: "POST",
      appName: "MSP-Bus",
      description:
        "Obtain bus arrival and departure information, including arrival time, station name, latitude and longitude, etc.",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "carId",
          description: "vehicle ID",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/ioc/bussarrdeplist",
      methodApi: "POST",
      apiPath: "/api/ioc/bussarrdeplist",
      domain: "",
      name: "Obtain bus arrival and departure information",
      id: "1003",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-256",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Bus-Api",
        description: "MSP-Bus API",
        id: "101",
      },
      method: "POST",
      appName: "MSP-Bus",
      description:
        "Obtain the number of lines, the total mileage of lines, and the number of stations.",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "year",
          description: "years(yyyy)",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/ioc/buscounterinfo",
      methodApi: "POST",
      apiPath: "/api/ioc/buscounterinfo",
      domain: "",
      name: "Obtain the summary information of bus line mileage platform",
      id: "1004",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-256",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Bus-Api",
        description: "MSP-Bus API",
        id: "101",
      },
      method: "POST",
      appName: "MSP-Bus",
      description:
        "Get the trajectory coordinates of the line for drawing the roadmap",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lineId",
          description: "Line ID",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lineType",
          description: "Uplink and downlink type 0: Uplink 1: Downlink",
          id: "3",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/ioc/carhistoryget",
      methodApi: "POST",
      apiPath: "/api/ioc/carhistoryget",
      domain: "",
      name: "Get bus line track information",
      id: "1005",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-256",
    },
  ],
  apiServe111: [
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Tram-Api",
        description: "MSP-Tram API",
        id: "111",
      },
      method: "POST",
      appName: "MSP-Tram",
      description: "Obtain real-time uplink data of light rail lines",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lineId",
          description: "lineId ID",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/queryUpData",
      methodApi: "POST",
      apiPath: "/api/ioc/queryUpData",
      domain: "",
      name: "Obtain basic bus information",
      id: "1101",
      contentType: "application/json",
      status: "Published",
      authentication: "NoAuth",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Tram-Api",
        description: "MSP-Tram API",
        id: "111",
      },
      method: "POST",
      appName: "MSP-Tram",
      description: "Obtain real-time uplink data of light rail lines",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lineId",
          description: "lineId ID",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/queryDownData",
      methodApi: "POST",
      apiPath: "/api/ioc/queryDownData",
      domain: "",
      name: "Obtain basic bus information",
      id: "1102",
      contentType: "application/json",
      status: "Published",
      authentication: "NoAuth",
    },
  ],
  apiServe121: [
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Shuttle-Bus-Api",
        description: "MSP-Shuttle-Bus API",
        id: "121",
      },
      method: "POST",
      appName: "MSP-Shuttle-Bus",
      description: "Order Custom Line Tickets",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "userPhone",
          description: "User Phone",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "userName",
          description: "User Name",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lineId",
          description: "Line ID",
          id: "4",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/ticketBooking",
      methodApi: "POST",
      apiPath: "/api/ioc/ticketBooking",
      domain: "",
      name: "ticket booking",
      id: "1201",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Shuttle-Bus-Api",
        description: "MSP-Shuttle-Bus API",
        id: "121",
      },
      method: "POST",
      appName: "MSP-Shuttle-Bus",
      description: "Order Custom Line Tickets",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lineId",
          description: "Line ID",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "quantity",
          description: "Number of tickets purchased",
          id: "3",
          addr: "Body",
          type: "int",
        },
        {
          default: "",
          need: "yes",
          name: "quantity",
          description: "Number of tickets purchased",
          id: "4",
          addr: "Body",
          type: "int",
        },
      ],
      timeOut: 10,
      path: "/api/lineTeam",
      methodApi: "POST",
      apiPath: "/api/ioc/lineTeam",
      domain: "",
      name: "line team",
      id: "1202",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Shuttle-Bus-Api",
        description: "MSP-Shuttle-Bus API",
        id: "121",
      },
      method: "POST",
      appName: "MSP-Shuttle-Bus",
      description: "order refund",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "orderNo",
          description: "orderNo",
          id: "2",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/api/refund",
      methodApi: "POST",
      apiPath: "/api/ioc/refund",
      domain: "",
      name: "refund",
      id: "1203",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
  ],
  apiServe131: [
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "E-Bike-Api",
        description: "MSP-E-Bike API",
        id: "131",
      },
      method: "POST",
      appName: "MSP-E-Bike",
      description: "Find nearby bikes",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "location",
          description:
            "Latitude and longitude, the first parameter is longitude, the second is latitude, separated by commas",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "businessType",
          description: "15 motorcycles 7593 bicycles",
          id: "3",
          addr: "Body",
          type: "int",
        },
      ],
      timeOut: 10,
      path: "/bicycle/queryNearBicycle",
      methodApi: "POST",
      apiPath: "/bicycle/queryNearBicycle",
      domain: "",
      name: "query near bicycle",
      id: "1301",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "E-Bike-Api",
        description: "MSP-E-Bike API",
        id: "131",
      },
      method: "POST",
      appName: "MSP-E-Bike",
      description:
        "Obtain vehicle details, vehicle latitude and longitude, vehicle number and other data",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "carId",
          description: "vehicle id",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "businessType",
          description: "15 motorcycle 7593 small bicycle",
          id: "3",
          addr: "Body",
          type: "int",
        },
      ],
      timeOut: 10,
      path: "/bicycle/getBicycleInfo",
      methodApi: "POST",
      apiPath: "/bicycle/getBicycleInfo",
      domain: "",
      name: "Get vehicle details",
      id: "1302",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "E-Bike-Api",
        description: "MSP-E-Bike API",
        id: "131",
      },
      method: "POST",
      appName: "MSP-E-Bike",
      description:
        "Obtain vehicle billing information, such as free toll distance, starting distance, starting price, starting time, etc.",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "businessType",
          description: "15 motorcycle 7593 small bicycle",
          id: "3",
          addr: "Body",
          type: "int",
        },
      ],
      timeOut: 10,
      path: "/bicycle/bikeAccountRules",
      methodApi: "POST",
      apiPath: "/bicycle/bikeAccountRules",
      domain: "",
      name: "Obtain vehicle billing information",
      id: "1303",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "E-Bike-Api",
        description: "MSP-E-Bike API",
        id: "131",
      },
      method: "POST",
      appName: "MSP-E-Bike",
      description: "Get a bike tutorial",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "businessType",
          description: "15 motorcycle 7593 small bicycle",
          id: "2",
          addr: "Body",
          type: "int",
        },
      ],
      timeOut: 10,
      path: "/bicycle/usedRules",
      methodApi: "POST",
      apiPath: "/bicycle/usedRules",
      domain: "",
      name: "Bicycle User Guide",
      id: "1304",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "E-Bike-Api",
        description: "MSP-E-Bike API",
        id: "131",
      },
      method: "POST",
      appName: "MSP-E-Bike",
      description: "Scan the code to unlock the bicycle for riding",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "businessType",
          description: "15 motorcycle 7593 small bicycle",
          id: "2",
          addr: "Body",
          type: "int",
        },
        {
          default: "",
          need: "yes",
          name: "userLat",
          description: "User origin longitude",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "userLng",
          description: "User origin longitude",
          id: "4",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "carId",
          description: "vehicle id",
          id: "5",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "startingPoint",
          description: "Description of starting point",
          id: "6",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "type",
          description: "1 Normal driving 2 Temporary parking and driving",
          id: "7",
          addr: "Body",
          type: "int",
        },
        {
          default: "",
          need: "yes",
          name: "orderNo",
          description: "Order number (must be passed for temporary unlocking)",
          id: "8",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/bicycle/scanCodeLock",
      methodApi: "POST",
      apiPath: "/bicycle/scanCodeLock",
      domain: "",
      name: "Scan code to unlock",
      id: "1305",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
  ],
  apiServe141: [
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Taxi-Api",
        description: "MSP-Taxi API",
        id: "141",
      },
      method: "POST",
      appName: "MSP-Taxi",
      description: "Online ride-hailing login",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "longitude",
          description: "longitude",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "latitude",
          description: "latitude",
          id: "3",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/taxi/login",
      methodApi: "POST",
      apiPath: "/taxi/queryNearDriver",
      domain: "",
      name: "Online ride-hailing login",
      id: "1401",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Taxi-Api",
        description: "MSP-Taxi API",
        id: "141",
      },
      path: "/taxi/queryNearDriver",
      method: "POST",
      name: "Get nearby vehicle information",
      description: "Get nearby vehicle information",
      id: "1402",
      status: "Published",
    },
    {
      method: "POST",
      appName: "MSP-Taxi",
      description: "Get billing rules",
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Taxi-Api",
        description: "MSP-Taxi API",
        id: "141",
      },
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lng",
          description: "lng",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lat",
          description: "lat",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "orderType",
          description:
            "Order type (OT00001: use the car immediately, OT00002: reserve the car)",
          id: "4",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "vehicleType",
          description:
            "Vehicle Type (OBT0001: Private Car-Economy, OBT0003: Taxi)",
          id: "5",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/taxi/getCalculateRule",
      methodApi: "POST",
      apiPath: "/taxi/getCalculateRule",
      domain: "",
      name: "Get billing rules",
      id: "1402",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Taxi-Api",
        description: "MSP-Taxi API",
        id: "141",
      },
      method: "POST",
      appName: "MSP-Taxi",
      description: "Online car-hailing travel planning",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "beginLongitude",
          description: "Starting point longitude",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "beginLatitude",
          description: "Latitude of starting point",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "beginAddress",
          description: "Starting point address",
          id: "4",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "beginAddressDetail",
          description: "Departure point address details",
          id: "5",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "endLongitude",
          description: "destination longitude",
          id: "6",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "endLatitude",
          description: "destination latitude",
          id: "7",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "endAddress",
          description: "destination address",
          id: "8",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "endAddress",
          description: "Destination address details",
          id: "9",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "no",
          name: "useVehicleTime",
          description: "Driving time (yyyy-MM-dd HH:mm:ss)",
          id: "10",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "no",
          name: "driverId",
          description: "driver ID",
          id: "11",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/taxi/planning",
      methodApi: "POST",
      apiPath: "/taxi/planning",
      domain: "",
      name: "Online car-hailing travel planning",
      id: "1403",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
  ],
  apiServe151: [
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Parking-Api",
        description: "MSP-Parking API",
        id: "151",
      },
      method: "POST",
      appName: "MSP-Parking",
      description: "Find nearby parking lots",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lng",
          description: "longitude",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lat",
          description: "latitude",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "type",
          description: "1 Maximum parking space 2 Nearest 3 Free",
          id: "4",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "distance",
          description: "Range (unit: meter, default 1500 if not passed)",
          id: "5",
          addr: "Body",
          type: "int",
        },
      ],
      timeOut: 10,
      path: "/parking/queryList",
      methodApi: "POST",
      apiPath: "/parking/queryList",
      domain: "",
      name: "Find nearby parking lots",
      id: "1501",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
    {
      apiServeMap: {
        nameType: "白名单",
        isIp: false,
        name: "Parking-Api",
        description: "MSP-Parking API",
        id: "151",
      },
      method: "POST",
      appName: "MSP-Parking",
      description: "Parking details",
      paramsList: [
        {
          default: "",
          need: "yes",
          name: "Authorization",
          description: "access token",
          id: "1",
          addr: "Header",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "carParkNo",
          description: "number plate",
          id: "2",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lng",
          description: "lng",
          id: "3",
          addr: "Body",
          type: "string",
        },
        {
          default: "",
          need: "yes",
          name: "lat",
          description: "lat",
          id: "4",
          addr: "Body",
          type: "string",
        },
      ],
      timeOut: 10,
      path: "/parking/queryDetail",
      methodApi: "POST",
      apiPath: "/parking/queryDetail",
      domain: "",
      name: "Parking details",
      id: "1502",
      contentType: "application/json",
      status: "Published",
      authentication: "HMAC-1",
    },
  ],
};

export function getApiServeData(key) {
  if (key) {
    return apiServeData[key] || [];
  } else {
    return apiServeData || [];
  }
}
