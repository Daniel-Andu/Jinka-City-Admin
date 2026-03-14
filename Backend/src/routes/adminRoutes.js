const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Apply auth to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// Auth
router.post('/login', adminController.login); // Wait, login should be separate, but since it's admin, maybe move to public or keep here.

// Settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

// Languages
router.get('/languages', adminController.getLanguages);
router.post('/languages', adminController.createLanguage);
router.put('/languages/:id', adminController.updateLanguage);
router.delete('/languages/:id', adminController.deleteLanguage);

// UI Translations
router.get('/ui-translations', adminController.getUiTranslations);
router.post('/ui-translations', adminController.createUiTranslation);
router.put('/ui-translations/:id', adminController.updateUiTranslation);
router.delete('/ui-translations/:id', adminController.deleteUiTranslation);

// Hero Sliders
router.get('/hero-sliders', adminController.getHeroSliders);
router.post('/hero-sliders', adminController.createHeroSlider);
router.put('/hero-sliders/:id', adminController.updateHeroSlider);
router.delete('/hero-sliders/:id', adminController.deleteHeroSlider);

// Hero Slider Translations
router.get('/hero-slider-translations', adminController.getHeroSliderTranslations);
router.post('/hero-slider-translations', adminController.createHeroSliderTranslation);
router.put('/hero-slider-translations/:id', adminController.updateHeroSliderTranslation);
router.delete('/hero-slider-translations/:id', adminController.deleteHeroSliderTranslation);

// Page Hero Slides (page -> slider mapping)
router.get('/page-hero-slides', adminController.getPageHeroSlides);
router.post('/page-hero-slides', adminController.createPageHeroSlide);
router.put('/page-hero-slides/:id', adminController.updatePageHeroSlide);
router.delete('/page-hero-slides/:id', adminController.deletePageHeroSlide);

// Leaders / Mayor
router.get('/leaders', adminController.getLeaders);
router.post('/leaders', adminController.createLeader);
router.put('/leaders/:id', adminController.updateLeader);
router.delete('/leaders/:id', adminController.deleteLeader);

// Leader Translations
router.get('/leader-translations', adminController.getLeaderTranslations);
router.post('/leader-translations', adminController.createLeaderTranslation);
router.put('/leader-translations/:id', adminController.updateLeaderTranslation);
router.delete('/leader-translations/:id', adminController.deleteLeaderTranslation);

// City Stats
router.get('/city-stats', adminController.getCityStats);
router.post('/city-stats', adminController.createCityStat);
router.put('/city-stats/:id', adminController.updateCityStat);
router.delete('/city-stats/:id', adminController.deleteCityStat);

// Departments
router.get('/departments', adminController.getDepartments);
router.post('/departments', adminController.createDepartment);
router.put('/departments/:id', adminController.updateDepartment);
router.delete('/departments/:id', adminController.deleteDepartment);
router.get('/department-translations', adminController.getDepartmentTranslations);
router.post('/department-translations', adminController.createDepartmentTranslation);
router.put('/department-translations/:id', adminController.updateDepartmentTranslation);
router.delete('/department-translations/:id', adminController.deleteDepartmentTranslation);

// Services
router.get('/services', adminController.getServices);
router.post('/services', adminController.createService);
router.put('/services/:id', adminController.updateService);
router.delete('/services/:id', adminController.deleteService);
router.get('/service-translations', adminController.getServiceTranslations);
router.post('/service-translations', adminController.createServiceTranslation);
router.put('/service-translations/:id', adminController.updateServiceTranslation);
router.delete('/service-translations/:id', adminController.deleteServiceTranslation);

// News
router.get('/news', adminController.getNews);
router.post('/news', adminController.createNews);
router.put('/news/:id', adminController.updateNews);
router.delete('/news/:id', adminController.deleteNews);
router.get('/news-translations', adminController.getNewsTranslations);
router.post('/news-translations', adminController.createNewsTranslation);
router.put('/news-translations/:id', adminController.updateNewsTranslation);
router.delete('/news-translations/:id', adminController.deleteNewsTranslation);
router.get('/news-categories', adminController.getNewsCategories);
router.post('/news-categories', adminController.createNewsCategory);
router.put('/news-categories/:id', adminController.updateNewsCategory);
router.delete('/news-categories/:id', adminController.deleteNewsCategory);
router.get('/news-category-translations', adminController.getNewsCategoryTranslations);
router.post('/news-category-translations', adminController.createNewsCategoryTranslation);
router.put('/news-category-translations/:id', adminController.updateNewsCategoryTranslation);
router.delete('/news-category-translations/:id', adminController.deleteNewsCategoryTranslation);
router.get('/news-category-map', adminController.getNewsCategoryMap);
router.post('/news-category-map', adminController.createNewsCategoryMap);
router.delete('/news-category-map/:id', adminController.deleteNewsCategoryMap);

// News Tags
router.get('/news-tags', adminController.getNewsTags);
router.post('/news-tags', adminController.createNewsTag);
router.put('/news-tags/:id', adminController.updateNewsTag);
router.delete('/news-tags/:id', adminController.deleteNewsTag);
router.get('/news-tag-translations', adminController.getNewsTagTranslations);
router.post('/news-tag-translations', adminController.createNewsTagTranslation);
router.put('/news-tag-translations/:id', adminController.updateNewsTagTranslation);
router.delete('/news-tag-translations/:id', adminController.deleteNewsTagTranslation);
router.get('/news-tag-map', adminController.getNewsTagMap);
router.post('/news-tag-map', adminController.createNewsTagMap);
router.delete('/news-tag-map/:id', adminController.deleteNewsTagMap);

// Documents
router.get('/documents/categories', adminController.getDocumentCategories);
router.post('/documents/categories', adminController.createDocumentCategory);
router.get('/documents', adminController.getDocuments);
router.get('/documents/:id', adminController.getDocumentById);
router.post('/documents', adminController.createDocument);
router.put('/documents/:id', adminController.updateDocument);
router.delete('/documents/:id', adminController.deleteDocument);

// Projects
router.patch('/projects/:id/progress', adminController.updateProjectProgress);
router.get('/projects', adminController.getProjects);
router.get('/projects/:id', adminController.getProjectById);
router.post('/projects', adminController.createProject);
router.put('/projects/:id', adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);

// Events
router.get('/events/range', adminController.getEventsByRange);
router.get('/events', adminController.getEvents);
router.get('/events/:id', adminController.getEventById);
router.post('/events', adminController.createEvent);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);

// Reports
router.get('/reports/statistics', adminController.getReportStatistics);
router.get('/reports/department-performance', adminController.getDepartmentPerformance);
router.get('/reports/activities', adminController.getReportActivities);
router.get('/reports/export/:type', adminController.exportReport);

// Newsletter
router.post('/newsletter/send', adminController.sendNewsletter);

// Pages
router.get('/pages', adminController.getPages);
router.post('/pages', adminController.createPage);
router.put('/pages/:id', adminController.updatePage);
router.delete('/pages/:id', adminController.deletePage);

// Subscribers
router.get('/subscribers', adminController.getSubscribers);
router.delete('/subscribers/:id', adminController.deleteSubscriber);

// Contact Messages
router.get('/contacts', adminController.getContacts);
router.delete('/contacts/:id', adminController.deleteContact);

// Analytics
router.get('/analytics/visitors', adminController.getVisitorStats);
router.get('/analytics/visitors/series', adminController.getVisitorSeries);

// Media Library
router.get('/media', adminController.getMedia);
router.delete('/media/:id', adminController.deleteMedia);

// File upload
router.post('/upload', adminController.uploadFile);

module.exports = router;
