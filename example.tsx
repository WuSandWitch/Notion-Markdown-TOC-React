import React from 'react'
import { TableOfContents, TableOfContentsTheme } from '@wusandwitch/notion-markdown-toc-react'

// Sample markdown content
const markdownContent = `
# Introduction
This is a beautiful Table of Contents component inspired by Notion's design.

## Installation
You can install this package via npm.

### Using npm
\`\`\`bash
npm install @wusandwitch/notion-markdown-toc-react framer-motion
\`\`\`

### Using yarn
\`\`\`bash
yarn add @wusandwitch/notion-markdown-toc-react framer-motion
\`\`\`

## Basic Usage
The simplest way to use it is just passing content and title.

### Import Component
\`\`\`tsx
import { TableOfContents } from '@wusandwitch/notion-markdown-toc-react'
\`\`\`

### Use in Your Component
JSX usage examples are shown in the code below.

## Custom Theming
You can fully customize the component's appearance.

### Color Themes
Supports customizing all colors including primary, background, etc.

### Font Settings
You can set font sizes and font families for different heading levels.

### Position Settings
Supports left/right positioning with custom offsets.

## Advanced Features
The component also provides many advanced features.

### Responsive Design
Automatically hidden on small screens, visible on large screens only.

### Smooth Scrolling
Clicking TOC items smoothly scrolls to corresponding sections.

### Active State Tracking
Automatically tracks current reading position and highlights accordingly.

# Configuration Options
Detailed configuration options explanation.

## Required Parameters
- content: markdown content
- title: TOC title

## Optional Parameters
- theme: theme configuration
- position: position settings
- className: custom CSS classes
`

// Custom theme example
const customTheme: TableOfContentsTheme = {
  primaryColor: '#8b5cf6',
  backgroundColor: 'rgba(15, 23, 42, 0.9)',
  borderColor: '#334155',
  textColor: '#f1f5f9',
  mutedTextColor: '#94a3b8',
  hoverColor: '#334155',
  fontFamily: '"Inter", "SF Pro Display", sans-serif',
  fontSize: {
    title: '16px',
    level1: '14px',
    level2: '13px',
    level3Plus: '12px'
  }
}

// Usage example component
export function ExamplePage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Basic usage */}
      <TableOfContents 
        content={markdownContent}
        title="Documentation"
      />
      
      {/* Custom theme usage */}
      <TableOfContents 
        content={markdownContent}
        title="Custom Theme TOC"
        theme={customTheme}
        position="right"
        offsetTop={100}
        offsetSide={20}
        className="custom-toc"
      />
      
      {/* Your main content */}
      <div style={{ lineHeight: 1.6, fontFamily: 'system-ui' }}>
        <h1 id="introduction">Introduction</h1>
        <p>This is a beautiful Table of Contents component inspired by Notion's design.</p>
        
        <h2 id="installation">Installation</h2>
        <p>You can install this package via npm.</p>
        
        <h3 id="using-npm">Using npm</h3>
        <pre><code>npm install @wusandwitch/notion-markdown-toc-react framer-motion</code></pre>
        
        <h3 id="using-yarn">Using yarn</h3>
        <pre><code>yarn add @wusandwitch/notion-markdown-toc-react framer-motion</code></pre>
        
        <h2 id="basic-usage">Basic Usage</h2>
        <p>The simplest way to use it is just passing content and title.</p>
        
        <h3 id="import-component">Import Component</h3>
        <p>Import the component in your React application.</p>
        
        <h3 id="use-in-your-component">Use in Your Component</h3>
        <p>Add the component to your JSX.</p>
        
        <h2 id="custom-theming">Custom Theming</h2>
        <p>You can fully customize the component's appearance.</p>
        
        <h3 id="color-themes">Color Themes</h3>
        <p>Supports customizing all colors including primary, background, etc.</p>
        
        <h3 id="font-settings">Font Settings</h3>
        <p>You can set font sizes and font families for different heading levels.</p>
        
        <h3 id="position-settings">Position Settings</h3>
        <p>Supports left/right positioning with custom offsets.</p>
        
        <h2 id="advanced-features">Advanced Features</h2>
        <p>The component also provides many advanced features.</p>
        
        <h3 id="responsive-design">Responsive Design</h3>
        <p>Automatically hidden on small screens, visible on large screens only.</p>
        
        <h3 id="smooth-scrolling">Smooth Scrolling</h3>
        <p>Clicking TOC items smoothly scrolls to corresponding sections.</p>
        
        <h3 id="active-state-tracking">Active State Tracking</h3>
        <p>Automatically tracks current reading position and highlights accordingly.</p>
        
        <h1 id="configuration-options">Configuration Options</h1>
        <p>Detailed configuration options explanation.</p>
        
        <h2 id="required-parameters">Required Parameters</h2>
        <ul>
          <li>content: markdown content</li>
          <li>title: TOC title</li>
        </ul>
        
        <h2 id="optional-parameters">Optional Parameters</h2>
        <ul>
          <li>theme: theme configuration</li>
          <li>position: position settings</li>
          <li>className: custom CSS classes</li>
        </ul>
      </div>
    </div>
  )
}

export default ExamplePage 