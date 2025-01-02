# RevPay Challenge - React Form Application

This project is a comprehensive form application built with React, TypeScript, and modern web technologies. It demonstrates best practices in form handling, state management, and user interface design.

## 🏗 Architecture & File Structure

The project follows a modular architecture with clear separation of concerns:

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Base UI components (shadcn/ui)
│   └── form-card/    # Form-specific components
├── hooks/            # Custom React hooks
├── stores/           # State management (Zustand)
├── constants/        # Application constants
├── lib/             # Utility functions
└── types/           # TypeScript type definitions
```

### Key Architectural Decisions

1. **Component Modularization**: Components are split into base UI components and feature-specific components, promoting reusability and maintainability.
2. **Lazy Loading**: Implemented using React.lazy() for form components to optimize initial load performance.
3. **Custom Hooks**: Business logic is extracted into custom hooks (`useCep`, `useSubmit`) for better separation of concerns.
4. **State Management**: Zustand is used for global state management, offering a simple and efficient solution.

## 🔄 Code Flow

1. The application starts in `App.tsx`, which sets up the React Query provider and renders the main form component.
2. The form component (`FormCard`) orchestrates:

   - Form state management using `react-hook-form`
   - Input masking and validation
   - API integration (CEP lookup)
   - Success modal display

3. Data flow:
   ```
   User Input → Form Validation → Data Masking → State Update → API Calls → UI Update
   ```

## 🛠 Tech Stack

- **React + TypeScript**: For type-safe component development
- **Vite**: Fast build tool and development server
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation
- **Zustand**: Lightweight state management
- **React Query**: Server state management and caching
- **Axios**: HTTP client
- **ShadCN UI**: Component library
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

## 💾 State Persistence

Input state persistence is handled through Zustand, providing:

- Form data preservation across component remounts
- Automatic state updates for address fields after CEP lookup
- Clean state reset functionality

```typescript
interface FormStore {
  formData: Partial<FormSchema>;
  updateFormData: (data: Partial<FormSchema>) => void;
  resetForm: () => void;
}
```

## 🎨 UI Components

### Why ShadCN UI and Tailwind?

1. **ShadCN UI**:

   - Accessible by default
   - Fully customizable components
   - Good TypeScript support
   - Based on Radix UI primitives

2. **Tailwind CSS**:
   - Utility-first approach speeds up development
   - Built-in responsive design
   - Easy theming
   - Small bundle size

## 📝 TypeScript Integration

The project uses TypeScript extensively for type safety:

- **Form Schema Types**: Define the shape of form data
- **Component Props**: Strict typing for component properties
- **API Response Types**: Type definitions for external API responses
- **Store Types**: Type-safe state management

Example:

```typescript
export interface FormSchema {
  fullname: string;
  documentNumber: string;
  // ... other fields
}
```

# 🏗 Base Components

Base components are foundational UI elements that serve as building blocks for more complex components. While this project currently implements only BaseInput, the concept of base components is powerful and scalable.

## BaseInput Example

The project includes a BaseInput component that demonstrates the benefits of base components:

```typescript
export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, icon, iconClassName, iconSize, invalid, invalidMessage, ...props },
    ref
  ) => {
    // Component implementation
  }
);
```

This component handles:

- Label management
- Error states and messages
- Icon integration
- Accessibility features
- Consistent styling
- Form integration

## Why Base Components?

1. **Consistency**:

   - Enforces uniform styling and behavior
   - Maintains consistent UX patterns
   - Standardizes prop interfaces

2. **Maintainability**:

   - Single source of truth for common functionality
   - Easier updates and bug fixes
   - Centralized styling changes

3. **Development Speed**:

   - Reduces code duplication
   - Speeds up component creation
   - Simplifies testing

4. **Scalability**:
   Additional base components could include:

   - BaseButton
   - BaseCard
   - BaseModal
   - BaseSelect
   - BaseCheckbox

5. **Documentation**:
   - Serves as living documentation
   - Makes component usage self-explanatory
   - Helps maintain design system consistency

The BaseInput component in this project demonstrates these principles and provides a foundation for expanding the base component system as needed.

## 📦 Running the Project

The project includes a Makefile for easier command execution:

```bash
# Start development server
make d

# Build for production
make prod

# Reinstall dependencies and start dev server
make reinstall

# Clean install: remove node_modules, reinstall dependencies, start dev server
make reset
```

The Makefile provides convenient shortcuts:

- `d`: Quick start the development server
- `prod`: Build the project for production
- `reinstall`: Refresh dependencies and start development
- `reset`: Complete clean install if you're having dependency issues

## 🚀 Future Improvements

Given more time, the following improvements could be made:

1. **Testing**:

   - Unit tests for utility functions
   - Component testing with React Testing Library
   - End-to-end tests with Cypress

2. **Accessibility**:

   - Add more ARIA labels
   - Implement keyboard navigation
   - Add screen reader support

3. **UI/UX**:
   - Add loading skeletons
   - Improve mobile responsiveness
   - Add form progress indicator
   - Implement form analytics
