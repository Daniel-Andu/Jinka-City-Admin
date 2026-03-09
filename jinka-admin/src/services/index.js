// Export all services from a single entry point
export { authService } from './auth';
export { departmentService } from './departments';
export { projectService } from './projects';
export { reportService } from './reports';
export { announcementService } from './announcements';
export { eventService } from './events';
export { documentService } from './documents';
export { messageService } from './messages';
export { settingsService, languageService } from './settings';
export { uploadService } from './upload';
export { default as api, API_URL } from './api';
