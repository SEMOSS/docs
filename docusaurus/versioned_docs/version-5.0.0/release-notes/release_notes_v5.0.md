# Release Notes v5.0.0
 
# Release Notes
 
## Highlights
- **Enhanced AI Playground Experience**: Complete redesign with improved chat interface, model switching capabilities, and better tool management
- **Advanced Tool Execution**: New tool cancellation, auto-execution, and improved error handling for AI-powered workflows
- **Workspace Management Overhaul**: Redesigned workspace creation, editing, and sharing with better search and organization
- **Improved Database Operations**: Enhanced SQL query capabilities with better permissions and admin controls
- **Comprehensive UI/UX Updates**: Modernized interface with better theming, responsive design, and accessibility improvements
 
## New Features
 
### AI & Playground
- **Model Switching**: Switch AI models mid-conversation without losing chat history
- **Tool Cancellation**: Cancel running tools and see real-time execution status
- **Auto-execution**: Tools can now run automatically based on configuration
- **Chain of Thought (COT)**: Enhanced AI reasoning with step-by-step planning capabilities
- **Media Support**: Upload and process images, PDFs, and other media files in conversations
 
### Workspace & Project Management
- **Workspace Redesign**: New interface for creating, editing, and managing workspaces
- **Project Dependencies**: Better handling and visualization of project dependencies
- **Version Management**: Navigate between app versions with restore capabilities
- **Enhanced Search**: Improved search across workspaces, projects, and assets
 
### Database & Query Tools
- **Admin Query Support**: Administrators can now run all query types (not just SELECT)
- **Enhanced SQL Interface**: Improved query editor with better error handling and results display
- **Database Export Options**: Choose whether to export data along with database structure
 
## Improvements
 
### User Interface
- **Playground Redesign**: Modern chat interface with better message organization and date grouping
- **Responsive Design**: Improved mobile and tablet experience across all pages
- **Theme Support**: Better theming system with consistent color schemes
- **Accessibility**: Enhanced keyboard navigation and screen reader support
 
### Performance & Reliability
- **Streaming Improvements**: Better real-time updates for AI responses and tool execution
- **Error Handling**: More informative error messages and graceful failure recovery
- **Memory Management**: Optimized resource usage and cleanup
 
### Developer Experience
- **MCP (Model Control Protocol)**: Enhanced support for custom tools and integrations
- **Code Editor**: Improved syntax highlighting and autocompletion
- **Testing Framework**: Updated unit testing infrastructure with better coverage
 
## Bug Fixes
 
### Data & Visualization
- Fixed chart sizing issues when adding multiple visualizations
- Resolved axis label truncation in bar and line charts
- Fixed data export functionality for large datasets
- Corrected timestamp display formatting in query results
 
### User Management
- Fixed team permission propagation issues
- Resolved bookmark synchronization problems
- Fixed user profile update functionality
- Corrected access control validation for shared resources
 
### Application Stability
- Fixed memory leaks in long-running sessions
- Resolved file upload issues for large files
- Fixed navigation breadcrumb inconsistencies
- Corrected modal dialog positioning and scrolling
 
## Technical Changes
 
### Security
- **Audit Logging**: Comprehensive activity tracking and reporting
- **CSRF Protection**: Enhanced security for API endpoints
- **Authentication**: Improved SAML and OAuth integration
- **Data Masking**: Sensitive information protection in logs
 
### API & Integration
- **REST API Enhancements**: Better error responses and parameter validation
- **Streaming Protocol**: Improved real-time communication between frontend and backend
- **Plugin System**: Enhanced extensibility for custom integrations
- **Database Connectivity**: Better connection pooling and error recovery
 
### Updates
- **Java 21 Support**: Upgraded runtime environment for better performance
- **Dependency Updates**: Updated core libraries including Tomcat, database drivers, and security components
- **Docker Improvements**: Enhanced containerization with UBI8 support and better resource management
- **Build System**: Improved CI/CD pipeline with faster builds and better testing
---
 
*For technical details and migration notes, please refer to the individual repository documentation.*