import { OnErrorResponseDTO } from "../error-dto";

// type: "ENQUIRY" | "ENROLMENT" | "FEEDBACK" | "COMPLAINT";
export interface PuzzleGeneratorRequestDTO {

}
export interface PuzzleGeneratorResponseDTO extends OnErrorResponseDTO {
    wordSequence?: string,
    length?: number,
    wordCount?: number,
}

