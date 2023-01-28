// import { ref } from "vue";
// import axios from "axios";

// export default function useFetch(endpoint) {
//   const data = ref([]);
//   const error = ref(null);
//   const loading = ref(true);
//   async function fetchData() {
//     try {
//       const response = await axios.get(endpoint);
//       data.value = response.data;
//     } catch (err) {
//       error.value = err;
//     } finally {
//       loading.value = false;
//     }
//   }
//   fetchData();
//   return { data, error, loading };
// }
