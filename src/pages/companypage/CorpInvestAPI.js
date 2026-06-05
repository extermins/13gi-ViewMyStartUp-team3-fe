const BASE_URL = "https://one3gi-viewmystartup-team3-be.onrender.com";

export default {
  getCompany: async (id) => {
    const respon = await fetch(`${BASE_URL}/api/companies/${id}`);
    if (!respon.ok) throw new Error("에러가 발생했습니다.");
    return await respon.json();
  },
  getInvest: async (id, params = { page: 1, pageSize: 1 }) => {
    const urlParams = new URLSearchParams(params);
    const respon = await fetch(
      `${BASE_URL}/api/companies/${id}/investment?${urlParams}`,
    );
    if (!respon.ok) throw new Error("에러가 발생했습니다.");
    return await respon.json();
  },
  patchInvest: async (id, params = {}) => {
    const respon = await fetch(`${BASE_URL}/api/investments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!respon.ok) throw new Error("에러가 발생했습니다.");
    return await respon.json();
  },

  deleteInvest: async (id) => {
    const respon = await fetch(`${BASE_URL}/api/investments/${id}`, {
      method: "DELETE",
    });
    if (!respon.ok) throw new Error("에러가 발생했습니다.");
    return true;
  },
  checkPassword: async (id, password) => {
    const respon = await fetch(`${BASE_URL}/api/investments/${id}/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password }),
    });

    if (!respon.ok) throw new Error("에러가 발생했습니다.");
    return true;
  },
};
