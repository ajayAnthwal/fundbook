export const checkAuth = (router) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
  
      if (!token) {
        router.push("/auth");
        return;
      }
  
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/auth");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/auth");
      }
    }
  };
  