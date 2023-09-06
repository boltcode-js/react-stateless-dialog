import React from "react";

export type ProgressComponentProps = {
  message?: string;
};

/**
 * Represent a Progress component compatible with ProgressManager
 */
export interface ProgressComponent {
  (props: ProgressComponentProps): React.JSX.Element;
}
