import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDemandesDevis = createAsyncThunk("demandeDevis/fetchDemandesDevis", async () => {
  const response = await axios.get("http://localhost:7000/demande-devis");
  return response.data;
});

export const fetchDemandeDevis = createAsyncThunk("demandeDevis/fetchDemandeDevis", async (id) => {
  const response = await axios.get(`http://localhost:7000/demande-devis/${id}`);
  return response.data;
});

export const sendDemandeDevis = createAsyncThunk("demandeDevis/addDemandeDevis", async (body) => {
  const response = await axios.post("http://localhost:7000/demande-devis", body);
  return response.data;
});

export const updateDemandeDevis = createAsyncThunk("demandeDevis/updateDemandeDevis", async ({ id, body }) => {
  const response = await axios.patch(`http://localhost:7000/demande-devis/${id}`, body);
  return response.data;
});

export const deleteDemandeDevis = createAsyncThunk("demandeDevis/deleteDemandeDevis", async (id) => {
  await axios.delete(`http://localhost:7000/demande-devis/${id}`);
  return id;
});

export const updateDemandeDevisStatus = createAsyncThunk(
  "demandeDevis/updateDemandeDevisStatus",
  async ({ id, newStatus }) => {
    const response = await axios.patch(`http://localhost:7000/demande-devis/${id}`, {
      etat: newStatus,
    });
    return response.data;
  }
);

const demandeDevisSlice = createSlice({
  name: "demandeDevis",
  initialState: {
    demandesDevis: {
      items: [],
      count: 0,
    },
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDemandesDevis.fulfilled, (state, action) => {
      state.demandesDevis.items = action.payload;
      state.demandesDevis.count = action.payload.length;
    });
    builder.addCase(fetchDemandeDevis.fulfilled, (state, action) => {
      state.demandesDevis.items = action.payload;
      state.demandesDevis.count = action.payload.length;
    });
    builder.addCase(sendDemandeDevis.fulfilled, (state, action) => {
      state.demandesDevis.items.push(action.payload);
      state.demandesDevis.count++;
    });
    builder.addCase(updateDemandeDevis.fulfilled, (state, action) => {
      const updatedDemandeDevis = action.payload;
      const index = state.demandesDevis.items.findIndex(demande => demande.id === updatedDemandeDevis.id);
      if (index !== -1) {
        state.demandesDevis.items[index] = updatedDemandeDevis;
      }
    });
    builder.addCase(deleteDemandeDevis.fulfilled, (state, action) => {
      state.demandesDevis.items = state.demandesDevis.items.filter(demande => demande.id !== action.payload);
      state.demandesDevis.count--;
    });
  },
});

export default demandeDevisSlice.reducer;
