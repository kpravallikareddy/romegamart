const config = {
    screens: {
      Productdetails: {
        path: "productdetails/:id",
        parse: {
          id: (id) => `${id}`,
        },
      },
    //   Profile: {
    //     path: "profile/:id",
    //     parse: {
    //       id: (id) => `${id}`,
    //     },
    //   },
    //   Notifications: "notifications",
    //   Settings: "settings",
     },
  };
  
  const linking = {
    prefixes: ["romegamart://app"],
    config,
  };
  
  export default linking;