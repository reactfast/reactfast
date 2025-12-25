export const nextDrive = {
  slug: 'next-drive',
  content: `# NEXT_DRIVE

NEXT_DRIVE is a home cloud service built with Next.js, designed for **personal and local network cloud storage**.  
It allows users to host a fully functional cloud on their own machines with an intuitive, Google Cloud-like interface.

---

## Overview

NEXT_DRIVE originated as a spin-off of Jot.Space's media management system and my personal interest in **network engineering**.  

Having experimented with NAS systems and cloud services like Google Cloud and AWS S3, I wanted a solution that was **self-hosted, flexible, and easy for others to deploy**.  

The project is nearly complete and is currently undergoing security checks.  
It can be run on **any computer capable of hosting a local Next.js server**, making it accessible to devices on the same network.

---

## Key Features

- **Local Cloud Hosting:** Serve files directly from your own machine; users on the same network can interact with designated files and folders.  
- **Intuitive UI/UX:** Inspired by Google Cloud, providing a familiar and responsive file management experience.  
- **Supabase Integration (Optional):** Pair with Supabase to handle authentication, authorization, and remote hosting. Ideal for multiple users with segregated file access.  
- **Node + Bash Scripting:** Utilize Node.js to run local Bash scripts, retrieving file system data outside of the browser environment.  
- **Multi-User Support:** Users can interact with specific folders/files, respecting permissions and role-based access.

---

## Technical Stack

- **Frontend:** Next.js + React + Tailwind CSS  
- **Backend:** Optional Supabase for auth, roles, and storage syncing  
- **Local Integration:** Bash scripts executed on the host machine for direct file system access  
- **Deployment:** Can run locally or on any network-accessible machine; fully self-hosted or paired with custom domain via Supabase  

---

## Use Cases

- **Home Cloud:** Store and access files locally without relying on external cloud providers.  
- **Team Collaboration:** Share files across a local network with role-based access.  
- **Media Management:** Extend Jot.Space media modules to a local environment for secure handling of media assets.  

---

## Why It’s Interesting

NEXT_DRIVE demonstrates the power of Node.js for **hardware-level interaction** combined with React/Next UI.  
It’s a great example of a **self-hosted, network-friendly application** with real-time, multi-user accessibility and optional cloud integration.

---

> _"NEXT_DRIVE shows how self-hosted cloud solutions can match the functionality of major cloud providers while remaining fully under your control."_`,
}
