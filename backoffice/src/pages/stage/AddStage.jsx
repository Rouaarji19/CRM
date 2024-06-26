import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendStage } from "../../store/stage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchOpportunite } from "../../store/opportunite";

const AddStage = ({ opportuniteId }) => {
  const [stage, setStage] = useState({});

  useEffect(() => {
    setStage(prevStage => ({ ...prevStage, opportuniteId: parseInt(opportuniteId) }));
  }, [opportuniteId]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStage({ ...stage, [name]: value });
  };

  const handleAddStage = () => {
    // Ajouter opportuniteId avec les données du stage avant de l'envoyer
    const stageWithOpportuniteId = { ...stage, opportuniteId: parseInt(opportuniteId) };

    dispatch(sendStage(stageWithOpportuniteId))
      .then((res) => {
        if (!res.error) {
          toast.success("Le stage a été ajouté avec succès !");
          dispatch(fetchOpportunite(opportuniteId))
        } else {
          toast.error("Erreur lors de l'ajout du stage. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du stage. Veuillez réessayer.");
      });
  };

  return (
    <div className="form-container">
      <h2>Ajouter un stage</h2>
      <div className="form-input">
        <input
          className="form-control"
          placeholder="Nom"
          name="nom"
          onChange={handleChange}
        />
      </div>
      {/* Champ de saisie de l'ID Opportunité supprimé du formulaire */}
      <Button variant="warning" onClick={handleAddStage} className="form-button">
        Ajouter le stage
      </Button>
      <ToastContainer />
    </div>
  );
};

export default AddStage;
