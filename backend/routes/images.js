import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";

const router = express.Router();

// Nouvelle route pour retourner une image
router.get("/:imageName", (req, res) => {
  try {
    const imageName = req.params.imageName;

    // Utilisez import.meta.url pour obtenir l'URL actuelle du module
    const currentFilePath = fileURLToPath(import.meta.url);

    // Utilisez dirname pour obtenir le chemin du dossier du script actuel
    const currentDir = dirname(currentFilePath);

    // Assurez-vous que le chemin vers le dossier contenant les images est correct
    const imagePath = `${currentDir}/images/${imageName}`;

    // Utilisez res.sendFile() pour retourner le fichier
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
});

export default router;
