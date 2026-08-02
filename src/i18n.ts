import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        skills: 'Skills',
        experience: 'Experience',
        contact: 'Contact'
      },
      home: {
        greeting: "Hello, I'm",
        rolesLabel: 'Professional roles',
        buttons: {
          viewProjects: 'View Projects',
          downloadResume: 'Download Resume',
          contactMe: 'Contact Me'
        },
        social: {
          github: 'GitHub',
          email: 'Email'
        },
        profile: {
          alt: 'Professional Profile'
        },
        statistics: {
          heading: 'Key Statistics',
          description: 'A quick snapshot of my projects, languages, and current learning focus.'
        },
        featuredProjects: {
          heading: 'Featured Projects',
          description: 'Personal projects built to practice business analysis, system design, and problem-solving with real workflows.',
          techStack: 'Tech Stack',
          viewDetailsButton: 'View Details'
        }
      },
      about: {
        aboutMe: {
          heading: 'About Me'
        },
        careerGoal: {
          heading: 'Career Goal'
        },
        interests: {
          heading: 'Interests'
        },
        professionalSummary: {
          heading: 'Professional Summary'
        }
      },
      projects: {
        heading: 'Projects',
        description: 'Personal projects built to practice business analysis, system thinking, and data-driven design.',
        techStackLabel: 'Tech Stack',
        viewDetailsButton: 'View Details',
        githubLabel: 'GitHub'
      },
      skills: {
        technicalSkills: {
          heading: 'Technical Skills',
          description: "Tools and technologies I'm actively using and building with in my personal projects."
        },
        businessSkills: {
          heading: 'Core Skills',
          description: "Skills I've developed and regularly apply through real projects and work."
        },
        officeProductivity: {
          heading: 'Office & Productivity',
          description: 'Everyday tools I use for data, reporting, and documentation.'
        },
        languages: {
          heading: 'Languages',
          description: 'Languages I can use to communicate in a professional setting.'
        },
        learningJourney: {
          heading: 'Learning Journey',
          description: "Skills and topics I'm actively working on right now."
        }
      },
      experience: {
        heading: 'Experience',
        description: 'A summary of my work experience, education, certifications, and journey so far.',
        workExperience: {
          heading: 'Work Experience',
          present: 'Present'
        },
        education: {
          heading: 'Education',
          graduatedLabel: 'Graduated',
          gpaLabel: 'GPA'
        },
        certifications: {
          heading: 'Certifications'
        },
        timeline: {
          heading: 'Timeline'
        }
      },
      contact: {
        contactInformation: {
          heading: 'Contact Information'
        },
        email: {
          heading: 'Email'
        },
        phone: {
          heading: 'Phone'
        },
        github: {
          heading: 'GitHub'
        },
        cta: {
          heading: "Let's Connect",
          description: "Feel free to reach out by email — I'm happy to discuss opportunities or answer questions.",
          button: 'Send an Email'
        }
      },
      footer: {
        rights: '© {{year}} {{name}}. All rights reserved.',
        social: {
          github: 'GitHub',
          email: 'Email'
        }
      },
      theme: {
        label: 'Theme',
        names: {
          classic: 'Classic',
          neon: 'Neon',
          editorial: 'Editorial',
          candy: 'Candy',
          'luxury-noir': 'Luxury Noir'
        }
      },
      language: {
        switchToEnglish: 'Switch to English',
        switchToThai: 'Switch to Thai',
        switchToChinese: 'Switch to Chinese'
      }
    }
  },
  th: {
    translation: {
      nav: {
        home: 'หน้าแรก',
        about: 'เกี่ยวกับ',
        projects: 'โปรเจกต์',
        skills: 'ทักษะ',
        experience: 'ประสบการณ์',
        contact: 'ติดต่อ'
      },
      home: {
        greeting: 'สวัสดี ฉันคือ',
        rolesLabel: 'บทบาททางวิชาชีพ',
        buttons: {
          viewProjects: 'ดูโปรเจกต์',
          downloadResume: 'ดาวน์โหลดเรซูเม่',
          contactMe: 'ติดต่อฉัน'
        },
        social: {
          github: 'GitHub',
          email: 'อีเมล'
        },
        profile: {
          alt: 'โปรไฟล์มืออาชีพ'
        },
        statistics: {
          heading: 'สถิติสำคัญ',
          description: 'ภาพรวมโปรเจกต์ ภาษา และสิ่งที่กำลังโฟกัสเรียนรู้ในตอนนี้.'
        },
        featuredProjects: {
          heading: 'โปรเจกต์เด่น',
          description: 'โปรเจกต์ส่วนตัวที่สร้างขึ้นเพื่อฝึกฝนการวิเคราะห์ธุรกิจ การออกแบบระบบ และการแก้ปัญหาจากเวิร์กโฟลว์จริง.',
          techStack: 'Tech Stack',
          viewDetailsButton: 'ดูรายละเอียด'
        }
      },
      about: {
        aboutMe: {
          heading: 'เกี่ยวกับฉัน'
        },
        careerGoal: {
          heading: 'เป้าหมายอาชีพ'
        },
        interests: {
          heading: 'สิ่งที่สนใจ'
        },
        professionalSummary: {
          heading: 'สรุปประวัติวิชาชีพ'
        }
      },
      projects: {
        heading: 'โปรเจกต์',
        description: 'โปรเจกต์ส่วนตัวที่สร้างขึ้นเพื่อฝึกฝนการวิเคราะห์ธุรกิจ การคิดเชิงระบบ และการออกแบบโดยใช้ข้อมูลเป็นศูนย์กลาง.',
        techStackLabel: 'เทคสแตก',
        viewDetailsButton: 'ดูรายละเอียด',
        githubLabel: 'GitHub'
      },
      skills: {
        technicalSkills: {
          heading: 'ทักษะทางเทคนิค',
          description: 'เครื่องมือและเทคโนโลยีที่ฉันใช้งานและลงมือสร้างผลงานจริงอยู่เสมอในโปรเจกต์ส่วนตัว.'
        },
        businessSkills: {
          heading: 'ทักษะหลัก',
          description: 'ทักษะที่ฉันพัฒนาและนำไปใช้จริงผ่านโปรเจกต์และการทำงาน.'
        },
        officeProductivity: {
          heading: 'โปรแกรมสำนักงาน',
          description: 'เครื่องมือที่ใช้ในชีวิตประจำวันสำหรับข้อมูล การรายงาน และเอกสาร.'
        },
        languages: {
          heading: 'ภาษา',
          description: 'ภาษาที่ฉันสามารถใช้สื่อสารได้ในบริบทการทำงาน.'
        },
        learningJourney: {
          heading: 'เส้นทางการเรียนรู้',
          description: 'ทักษะและหัวข้อที่ฉันกำลังตั้งใจพัฒนาอยู่ในตอนนี้.'
        }
      },
      experience: {
        heading: 'ประสบการณ์',
        description: 'สรุปประสบการณ์ทำงาน การศึกษา ใบรับรอง และเส้นทางของฉันจนถึงปัจจุบัน.',
        workExperience: {
          heading: 'ประสบการณ์ทำงาน',
          present: 'ปัจจุบัน'
        },
        education: {
          heading: 'การศึกษา',
          graduatedLabel: 'สำเร็จการศึกษา',
          gpaLabel: 'เกรดเฉลี่ย'
        },
        certifications: {
          heading: 'ใบรับรอง'
        },
        timeline: {
          heading: 'ไทม์ไลน์'
        }
      },
      contact: {
        contactInformation: {
          heading: 'ข้อมูลติดต่อ'
        },
        email: {
          heading: 'อีเมล'
        },
        phone: {
          heading: 'โทรศัพท์'
        },
        github: {
          heading: 'GitHub'
        },
        cta: {
          heading: 'มาติดต่อกัน',
          description: 'สามารถติดต่อฉันได้ทางอีเมล ยินดีพูดคุยเกี่ยวกับโอกาสในการทำงานหรือตอบคำถามต่าง ๆ.',
          button: 'ส่งอีเมล'
        }
      },
      footer: {
        rights: '© {{year}} {{name}} สงวนลิขสิทธิ์.',
        social: {
          github: 'GitHub',
          email: 'อีเมล'
        }
      },
      theme: {
        label: 'ธีม',
        names: {
          classic: 'คลาสสิก',
          neon: 'นีออน',
          editorial: 'เอดิทอเรียล',
          candy: 'แคนดี้',
          'luxury-noir': 'ลักชัวรีนัวร์'
        }
      },
      language: {
        switchToEnglish: 'เปลี่ยนเป็นภาษาอังกฤษ',
        switchToThai: 'เปลี่ยนเป็นภาษาไทย',
        switchToChinese: 'เปลี่ยนเป็นภาษาจีน'
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        about: '关于',
        projects: '项目',
        skills: '技能',
        experience: '经历',
        contact: '联系方式'
      },
      home: {
        greeting: '你好，我是',
        rolesLabel: '职业角色',
        buttons: {
          viewProjects: '查看项目',
          downloadResume: '下载简历',
          contactMe: '联系我'
        },
        social: {
          github: 'GitHub',
          email: '邮箱'
        },
        profile: {
          alt: '职业形象照'
        },
        statistics: {
          heading: '核心数据',
          description: '快速了解我的项目、语言能力，以及目前的学习重点。'
        },
        featuredProjects: {
          heading: '精选项目',
          description: '通过真实工作流程锻炼商业分析、系统设计与问题解决能力的个人项目。',
          techStack: '技术栈',
          viewDetailsButton: '查看详情'
        }
      },
      about: {
        aboutMe: {
          heading: '关于我'
        },
        careerGoal: {
          heading: '职业目标'
        },
        interests: {
          heading: '兴趣爱好'
        },
        professionalSummary: {
          heading: '专业总结'
        }
      },
      projects: {
        heading: '项目',
        description: '通过真实工作流程锻炼商业分析、系统思维与数据驱动设计能力的个人项目。',
        techStackLabel: '技术栈',
        viewDetailsButton: '查看详情',
        githubLabel: 'GitHub'
      },
      skills: {
        technicalSkills: {
          heading: '技术技能',
          description: '我在个人项目中持续使用并不断精进的工具与技术。'
        },
        businessSkills: {
          heading: '核心技能',
          description: '我在实际项目与工作中培养并经常运用的能力。'
        },
        officeProductivity: {
          heading: '办公软件',
          description: '日常用于数据处理、报告撰写与文档制作的工具。'
        },
        languages: {
          heading: '语言能力',
          description: '能够在专业场合中使用的沟通语言。'
        },
        learningJourney: {
          heading: '学习历程',
          description: '目前正在积极学习和提升的技能与主题。'
        }
      },
      experience: {
        heading: '经历',
        description: '我的工作经历、教育背景、证书以及成长历程概览。',
        workExperience: {
          heading: '工作经历',
          present: '至今'
        },
        education: {
          heading: '教育背景',
          graduatedLabel: '毕业时间',
          gpaLabel: '绩点'
        },
        certifications: {
          heading: '证书'
        },
        timeline: {
          heading: '时间线'
        }
      },
      contact: {
        contactInformation: {
          heading: '联系信息'
        },
        email: {
          heading: '邮箱'
        },
        phone: {
          heading: '电话'
        },
        github: {
          heading: 'GitHub'
        },
        cta: {
          heading: '保持联系',
          description: '欢迎通过邮件与我联系，很乐意与您讨论合作机会或解答任何问题。',
          button: '发送邮件'
        }
      },
      footer: {
        rights: '© {{year}} {{name}}. 保留所有权利。',
        social: {
          github: 'GitHub',
          email: '邮箱'
        }
      },
      theme: {
        label: '主题',
        names: {
          classic: '经典',
          neon: '霓虹',
          editorial: '编辑风',
          candy: '糖果风',
          'luxury-noir': '奢华暗黑'
        }
      },
      language: {
        switchToEnglish: '切换为英文',
        switchToThai: '切换为泰文',
        switchToChinese: '切换为中文'
      }
    }
  }
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});
