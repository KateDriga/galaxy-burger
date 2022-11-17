interface ILoadingState {
  readonly isLoading: boolean;
}

export interface IFetchState extends ILoadingState {
  readonly isFailed: boolean;
}

export interface IFetchUserAdmissionState extends ILoadingState {
  readonly errorMessage: string | null;
}
