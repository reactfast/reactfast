export const antisocialSuite = {
  slug: 'antisocialsuite',
  content: `# 🧠 AntisocialSuite

**AntisocialSuite** was an ambitious suite of automation tools designed to manage and interact with multiple social media accounts autonomously.
The system combined **Bash**, **Ruby**, **Selenium**, and a **React-based frontend** to allow users to create, schedule, and run automated social media tasks — all while the suite handled the heavy lifting in the background.

---

## 🚀 Overview

At its core, **AntisocialSuite** helped users design complex automation workflows for platforms like **Twitter** and **Instagram**, freeing them from repetitive account management.

Key features included:

* **React web interface** for creating and monitoring automation tasks.
* **Background task engine** using **Bash and Ruby**, triggered via SQL table subscriptions.
* A **Mac Mini automation node** continuously running headless browser sessions across ~20 social accounts.

---

## ⚙️ Architecture

* **Frontend:** React-based dashboard for user task creation, monitoring, and control.
* **Backend:** Ruby scripts executed via Bash processes, orchestrated through SQL “queue” subscriptions — functioning like a custom job printer queue.
* **Automation Layer:** Selenium-driven headless browsers running on a dedicated Mac Mini server.
* **System Daemon:** A Bash daemon continuously monitored system health, automatically restarting failed jobs or the automation server if tasks stalled.

This architecture was built to be resilient — designed to recover from silent crashes, browser hangs, or anti-bot countermeasures without user intervention.

---

## 🧩 Technical Challenges

A major challenge was dealing with **anti-automation countermeasures** on Twitter and Instagram.
They frequently altered HTML structure — moving buttons deeper in the DOM without changing the visual layout — breaking Selenium’s XPath selectors and causing silent failures.

Solutions included:

* Implementing a **daemon process** to monitor task queue progress.
* Automatically restarting stalled jobs or the automation server.
* Identifying failed tasks, notifying users, and retrying actions gracefully.

This fault-tolerant approach was critical to maintaining automation reliability over time.

---

## 💡 Lessons Learned

Built fresh out of Flatiron School with a friend, **AntisocialSuite** was both ambitious and educational.

It helped me transition from a **front-end engineer** to thinking like a **software architect**, emphasizing:

* Multi-language system integration (React, Ruby, Bash).
* Observability, error recovery, and resilience.
* Building systems that adapt to failures instead of assuming perfect conditions.

---

## 🛠️ Tech Stack

* **Frontend:** React
* **Backend:** Ruby, Bash
* **Automation:** Selenium (headless Chrome)
* **Database / Queue:** SQL
* **Infrastructure:** macOS automation node with custom daemon monitoring

---

## 🎯 Summary

**AntisocialSuite** wasn’t just a social media automation suite — it was a hands-on lesson in **system design, automation resilience, and software engineering at scale**.
It taught me how to anticipate failure, build recovery systems, and design software that keeps working even when the world doesn’t play nice.`,
}
