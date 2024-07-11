import mongoose from "mongoose";

const collabSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    matricule: {
      type: String,
      required: true,
    },
    antenne: {
      type: String,
      required: true,
    },
    centre: {
      type: String,
      required: true,
      enum: [
        'rabat', 'fes', 'tanger', 'marrakesh', 'kenitra', 'oujda', 'casablanca', 'agadir', 'laayoune', 'dakhla', 'nador', 'tetouan', 'eljadida', 'meknes', 'safi', 'khouribga', 'beni mellal', 'taza', 'taounate', 'taourirt', 'tafraout', 'taroudant', 'tiznit'
      ],
    },
    fctOracle: {
      type: String,
      enum: ['CL', 'CTR', 'ECT', 'EF'],
    },
    fctExercer: {
      type: String,
      enum: ['CL', 'CTR', 'ECT', 'EF'],
    },
    situationRh: {
      type: String,
      enum: ['operationnel', 'retrait definitif', 'retrait temporaire'],
    },
    datePsy: {
      type: Date,
    },
    dateVm: {
      type: Date,
    },
    dateEA: {
      type: Date,
    },
    typePersonnel: {
      type: String,
      enum: ['statutaire', 'stgm'],
      default: 'statutaire',
    },
  },
  { timestamps: true }
);

const Collab = mongoose.model('Collab', collabSchema);

export default Collab;
