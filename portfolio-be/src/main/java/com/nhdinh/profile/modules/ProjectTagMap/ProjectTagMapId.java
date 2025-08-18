package com.nhdinh.profile.modules.ProjectTagMap;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagMapId implements Serializable {
    
    private UUID projectId;
    private UUID tagId;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectTagMapId that = (ProjectTagMapId) o;
        return Objects.equals(projectId, that.projectId) && Objects.equals(tagId, that.tagId);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(projectId, tagId);
    }
}
