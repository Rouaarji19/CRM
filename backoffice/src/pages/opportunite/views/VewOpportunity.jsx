// Board.js

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../Style1.css";
import {
  fetchOpportunite,
  fetchOpportunites,
  updateOpportunite,
} from "../../../store/opportunite"; // Importez la fonction d'updateOpportunite
import OpportunityCard from "../components/card"; // Importez la composante OpportunityCard
import { updateStage_client } from "../../../store/stage_client";

const ViewOpportunity = () => {
  const { opportunityId } = useParams();
  const [newStageName, setNewStageName] = useState("");
  const [stages, setStages] = useState([]);

  const dispatch = useDispatch();
  const opportunity = useSelector((state) => state.opportunite.opportunite);

  useEffect(() => {
    dispatch(fetchOpportunite(opportunityId));
  }, [dispatch]);

  useEffect(() => {
    if (opportunity?.stage) setStages(opportunity.stage);
  }, [opportunity]);
  // Ajout de refresh comme dépendance
  const handleStageNameChange = (event) => {
    setNewStageName(event.target.value);
  };

  const handleAddStage = () => {};

  const handleDragStart = (event, stageClient, stage, index) => {
    console.log(stageClient, stage, index, "drag");
    event.dataTransfer.setData(
      "stage",
      JSON.stringify({ stageClient, stage, index })
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event, targetStageId, index) => {
    event.preventDefault();
    
    const { stage, stageClient } = JSON.parse(
      event.dataTransfer.getData("stage")
    );
    const { id } = stageClient;
    
    dispatch(updateStage_client({ id, stageId: targetStageId })).then((res) => {
      if (!res.error) {
        let aux = [...stages];
        console.log(aux, "before");
        for (let i = 0; i < stages.length; i++) {
          if (stages[i].id === stage.id) {
            aux[i] = {
              ...aux[i],
              StageClient: aux[i].StageClient.filter((elem) => elem.id !== id),
            };
          }
          if (stages[i].id === targetStageId) {
            aux[i] = {
              ...aux[i],
              StageClient: [...aux[i].StageClient, stageClient],
            };
          }
        }
        console.log(aux, "after");
        setStages(aux);
      }
    });
    
  };

  return (
    <div className="crm-board">
      <div className="stages-container">
        {/* Render existing stages */}
        {stages?.map((stage, index) => (
          <div
            key={stage.id}
            className="stage"
            onDragOver={(event) => handleDragOver(event)}
            onDrop={(event) => handleDrop(event, stage.id, index)}
          >
            <h3>{stage.nom}</h3>
            {stage?.StageClient?.map((elem) => (
              <OpportunityCard
                key={elem.id}
                opportunity={elem?.Client}
                onDragStart={(event) =>
                  handleDragStart(event, elem, stage, index)
                }
              />
            ))}
          </div>
        ))}
        <div className="stage new-stage">
          <h3>New Stage</h3>
          <input
            type="text"
            value={newStageName}
            onChange={handleStageNameChange}
            placeholder="Enter stage name"
          />
          <button onClick={handleAddStage}>Add Stage</button>
        </div>
      </div>
    </div>
  );
};

export default ViewOpportunity;