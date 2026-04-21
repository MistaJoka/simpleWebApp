// types file: shared shape for anatomy pieces JSON
// side = who cares most: fe=frontend be=backend both=shared

/** one row in anatomy catalog */
export type WebAppPiece = {
  // slug id stable for keys
  id: string;
  // human title short
  title: string;
  // fe|be|both audience hint
  side: "fe" | "be" | "both";
  // what job this layer does
  role: string;
  // repo paths that usually hold this layer
  files: string[];
  // extra note for learners
  note: string;
};
