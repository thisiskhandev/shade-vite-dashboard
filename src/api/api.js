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

export const tags = async (payload) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROOT
      }/tags?include=${payload}&_fields=name,slug`,
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

export const categories = async (payload) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROOT
      }/categories?include=${payload}&_fields=name,slug`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      console.log("Cat", res.data);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostByCategories = async (payload) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_ROOT
      }/posts?categories[terms]=22&categories[operator]=AND`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(res.status === 200) {
      console.log(res.data);
      return res;
    }
  } catch (error) {
    console.log(error)
  }
};
