import React, { Component } from "react";
import "./index.css";
import LocaltionIcon from "../../../assets/images/placeholder.png";
import Graduation from "../../../assets/images/graduation-cap.png";
import Experience from "../../../assets/images/notepad.png";
import Clock from "../../../assets/images/clock-circular-outline.png";
import { convertToThousands, diff_hours } from "../../../utils/index";

export default class JobItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="job-item">
        <div className="job-title__wrapper">
          <div className="job-title__wrapper_name">{item.job_title}</div>
          <div className="job-title__wrapper_salary">
            ₱{convertToThousands(item.salary_range_from)} - ₱
            {convertToThousands(item.salary_range_to)}
          </div>
        </div>
        <div className="job-requirement">
          <ul>
            <li>
              <img src={LocaltionIcon} alt="location" width={12} />
              {item.job_location}
            </li>
            <li>
              <img src={Experience} alt="experience" width={12} />
              {item.xp_lvl}
            </li>
          </ul>
          <ul>
            <li>
              <img src={Graduation} alt="location" width={12} />
              {item.degree}
            </li>
            <li>
              <img src={Clock} alt="experience" width={12} />
              {item.job_type}
            </li>
          </ul>
        </div>
        <div className="job-company-detail">
          <div className="job-company-detail-icon">
            <img src={item.company_logo} alt="company_logo" width={30} />
            {item.company_name} Corp
          </div>
          <div className="job-company-detail-time">
            {diff_hours(new Date(item.refreshed_at), new Date())} hours ago
          </div>
        </div>
      </div>
    );
  }
}
