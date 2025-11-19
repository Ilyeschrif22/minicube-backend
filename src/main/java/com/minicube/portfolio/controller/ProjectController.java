package com.minicube.portfolio.controller;

import com.minicube.portfolio.entity.Project;
import com.minicube.portfolio.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@AllArgsConstructor
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping()
    public List<Project> getProjects()
    {
        return projectRepository.findAll();
    }

    @PostMapping()
    public Project createProject(@RequestBody Project project){
        return projectRepository.save(project);
    }

    @DeleteMapping()
    public void deleteAllProject(@RequestBody Project project){
        projectRepository.deleteAll();
    }

}
