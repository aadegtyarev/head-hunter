import { ref } from "vue";
import axios from "axios";

export default function useEditUser() {
  const formEditVisible = ref(false);

  const editUser = async (user) => {
    try {
      const response = await axios.put("/user", {
        id: user.id,
        name: user.name,
        login: user.login,
        tg_login: user.tg_login,
        email: user.email,
        password: user.password,
        position: user.position,
      });
      formEditVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  const showEditForm = () => {
    try {
      formEditVisible.value = true;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    editUser,
    showEditForm,
    formEditVisible,
  };
}