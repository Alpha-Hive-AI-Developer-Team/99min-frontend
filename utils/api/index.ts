export { authApi } from "./auth.api";
export { meApi } from "./me.api";

// tasks — named function exports (no longer a tasksApi object)
export {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
  respondToTask,
  fetchTaskResponses,
  reportTask,
  shareTask,
  uploadMedia,
} from "./tasks.api";

export { setAccessToken, getAccessToken } from "./client";

// Types
export type { User, AuthResponse } from "./auth.api";
export type {
  CreateTaskPayload,
  TaskListParams,
  RespondToTaskPayload,
  ReportTaskPayload,
  ApiTask,
  ApiListResponse,
  ApiTaskResponse,
} from "./tasks.api";