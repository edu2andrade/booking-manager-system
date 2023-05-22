const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      companyData: {},
      userProfileData: {},
      userDashboardAdmin: {},
    },
    actions: {
      saveCompanyData: (data) => {
        const store = getStore();
        setStore({ companyData: { ...store.companyData, data } });
        console.log("Saved in Flux -->", store);
      },
      saveUserProfileData: (userData) => {
        const store = getStore();
        setStore({ userProfileData: { ...store.userProfileData, userData } });
        console.log("Saved in Flux -->", store);
      },
      saveUserAdmin: (userAdminData) => {
        const store = getStore();
        setStore({
          userDashboardAdmin: { ...store.userDashboardAdmin, userAdminData },
        });
        console.log("Saved in Flux -->", store);
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
