import axios from "axios";

export const author = async (payload) => {
  //   console.log("Users API hit!", payload);
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROOT
      }/users?include=${payload}&_fields=id,name`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
